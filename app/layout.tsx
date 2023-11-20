import React from 'react'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: {
		default: '芜湖',
		template: `%s | 哈哈`,
	},
	description: 'dddddd',
	icons: [
		{
			url: '/rabbit.svg',
			href: '/rabbit.svg',
		},
	],
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html>
			<body className={`${inter.className} bg-slate-900`}>
				{children}
			</body>
		</html>
	)
}
