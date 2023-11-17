import './globals.css'
import Head from 'next/head'
import type { AppProps } from 'next/app'

import { useRouter } from 'next/router'

import { useEffect, useState } from 'react'
import Layout from '@/components/layout'

const withoutLayoutList = ['/404', '/login', 'register']

export default function App({ Component, pageProps }: AppProps) {
	const router = useRouter()
	const { name = 'M' } = router.query

	const [showLayout, setShowLayout] = useState(true)

	useEffect(() => {
		if (withoutLayoutList.includes(router.pathname)) {
			setShowLayout(false)
		} else {
			setShowLayout(true)
		}
	}, [])

	return (
		<>
			<Head>
				<title>{name}</title>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1"
				/>
				<link rel="icon" href="/rabbit.svg" sizes="any" />
			</Head>
			<div className="min-h-screen w-screen bg-slate-900">
				<div className="min-h-screen max-w-[1080px] mx-auto">
					{showLayout ? (
						<Layout>
							<Component {...pageProps} />
						</Layout>
					) : (
						<Component {...pageProps} />
					)}
				</div>
			</div>
		</>
	)
}
