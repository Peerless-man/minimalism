import { devtools, persist } from 'zustand/middleware'

// 自定义持久化中间件
const persistMiddleware = (f: any, name: string): any =>
	devtools(persist(f, { name }))

export default persistMiddleware
