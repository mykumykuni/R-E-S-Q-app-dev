import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { promises as fs } from 'node:fs'
import path from 'node:path'

const dataUrlPattern = /^data:(image\/[a-zA-Z0-9.+-]+);base64,(.+)$/

const getImageExtension = (mimeType) => {
  const mimeToExtension = {
    'image/png': 'png',
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg',
    'image/webp': 'webp',
    'image/gif': 'gif',
    'image/svg+xml': 'svg',
  }

  return mimeToExtension[mimeType] || 'png'
}

const persistAvatarIfNeeded = async (avatarValue, role) => {
  if (!avatarValue || typeof avatarValue !== 'string') {
    return avatarValue
  }

  const matches = avatarValue.match(dataUrlPattern)

  if (!matches) {
    return avatarValue
  }

  const mimeType = matches[1]
  const base64Data = matches[2]
  const extension = getImageExtension(mimeType)
  const fileName = `${role}-avatar-${Date.now()}.${extension}`
  const imagesDirPath = path.resolve(process.cwd(), 'public/assets/images')
  const filePath = path.join(imagesDirPath, fileName)

  await fs.mkdir(imagesDirPath, { recursive: true })
  await fs.writeFile(filePath, Buffer.from(base64Data, 'base64'))

  return `/assets/images/${fileName}`
}

const usersApiPlugin = () => ({
  name: 'users-api-plugin',
  configureServer(server) {
    server.middlewares.use(async (req, res, next) => {
      if (!req.url?.startsWith('/api/users')) {
        next()
        return
      }

      const usersFilePath = path.resolve(process.cwd(), 'src/data/users.json')

      if (req.method === 'GET' && req.url === '/api/users') {
        try {
          const fileContent = await fs.readFile(usersFilePath, 'utf-8')
          res.setHeader('Content-Type', 'application/json')
          res.end(fileContent)
        } catch {
          res.statusCode = 500
          res.end(JSON.stringify({ message: 'Failed to read users data.' }))
        }
        return
      }

      if (req.method === 'PUT' && req.url?.startsWith('/api/users/')) {
        let requestBody = ''
        const role = req.url.split('/').at(-1)

        req.on('data', (chunk) => {
          requestBody += chunk
        })

        req.on('end', async () => {
          try {
            const payload = JSON.parse(requestBody)
            const fileContent = await fs.readFile(usersFilePath, 'utf-8')
            const usersData = JSON.parse(fileContent)

            if (!Array.isArray(usersData.users) || usersData.users.length === 0) {
              res.statusCode = 400
              res.end(JSON.stringify({ message: 'No users found to update.' }))
              return
            }

            const userIndex = usersData.users.findIndex((user) => user.role === role)

            if (userIndex === -1) {
              res.statusCode = 404
              res.end(JSON.stringify({ message: 'User not found.' }))
              return
            }

            const persistedAvatar = await persistAvatarIfNeeded(payload.avatar, role)

            usersData.users[userIndex] = {
              ...usersData.users[userIndex],
              email: payload.email ?? usersData.users[userIndex].email,
              password: payload.password ?? usersData.users[userIndex].password,
              avatar: persistedAvatar ?? usersData.users[userIndex].avatar,
            }

            await fs.writeFile(usersFilePath, JSON.stringify(usersData, null, 2), 'utf-8')

            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify(usersData.users[userIndex]))
          } catch {
            res.statusCode = 500
            res.end(JSON.stringify({ message: 'Failed to update users data.' }))
          }
        })

        return
      }

      next()
    })
  },
})

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), usersApiPlugin()],
})
