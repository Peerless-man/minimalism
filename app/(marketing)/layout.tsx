'use client'
import React from 'react'

import Footer from './_components/footer/index'

export default function MarketingLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<div className="mx-auto h-full  max-w-[1080px]">
			<div className="w-full h-full text-white px-4 py-2">{children}</div>
			<Footer />
		</div>
	)
}
