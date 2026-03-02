import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { promises as fs } from 'node:fs'
import path from 'node:path'

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

            usersData.users[userIndex] = {
              ...usersData.users[userIndex],
              email: payload.email,
              password: payload.password,
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
