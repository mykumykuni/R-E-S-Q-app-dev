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

      if (req.method === 'PUT' && req.url === '/api/users/admin') {
        let requestBody = ''

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

            const adminIndex = usersData.users.findIndex((user) => user.role === 'admin')

            if (adminIndex === -1) {
              res.statusCode = 404
              res.end(JSON.stringify({ message: 'Admin user not found.' }))
              return
            }

            usersData.users[adminIndex] = {
              ...usersData.users[adminIndex],
              email: payload.email,
              password: payload.password,
            }

            await fs.writeFile(usersFilePath, JSON.stringify(usersData, null, 2), 'utf-8')

            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify(usersData.users[adminIndex]))
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
