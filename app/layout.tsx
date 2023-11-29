import React from 'react'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

import { Providers } from './theme-providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: {
		default: `M's Next Site`,
		template: `%s | `,
	},
	description:
		'一个由Next.js、Headless UI、Tailwind.css、md-editor-rt、contentlayer开发的文档 部署在vercel上',
	icons: [
		{
			url: '/m.svg',
		},
	],
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body
				className={`${inter.className} w-full h-full duration-300 bg-white dark:bg-slate-900 text-black dark:text-slate-400`}
			>
				<Providers>{children}</Providers>
			</body>
		</html>
	)
}
