const express = require('express')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'

// 将服务器与next.js连接，{ dev: process.env.NODE_ENV !== 'production' }表示是否开发模式调用next
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare()
	.then(() => {
		const server = express()

		server.get('*', (req, res) => {
			return handle(req, res)
		})

		server.listen(3333, err => {
			if (err) throw err
			console.log('> Ready on http://localhost:3333')
		})
	})
	.catch(ex => {
		console.error(ex.stack)
		process.exit(1)
	})
