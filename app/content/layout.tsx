'use client'
import React from 'react'
import Layout from './_components/layout'

export default function ContentLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<>
			<Layout>{children}</Layout>
		</>
	)
}
