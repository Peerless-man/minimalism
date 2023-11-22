'use client'
import React, { useEffect, useState } from 'react'
import { Disclosure, Transition } from '@headlessui/react'
import Link from 'next/link'

import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { Menu } from '../../../../type/menu.type'

const defaultMenuList: Menu = [
	{
		title: '随笔',
		children: [
			{
				title: 'essay1',
				path: '/essays/1',
			},
			{
				title: 'essay2',
				path: '/essays/2',
			},
			{
				title: 'essay3',
				path: '/essays/3',
			},
			{
				title: 'essay4',
				path: '/essays/4',
			},
		],
	},
	{
		title: '技术文章',
	},
]

function renderMenu({
	menuList,
	menuShow,
}: {
	menuList: Menu
	menuShow: boolean | undefined
}) {
	if (!menuList.length) {
		return (
			<div className="w-full h-full flex justify-center items-center">
				<span className="text-xl font-bold">Loading...</span>
			</div>
		)
	}

	return (
		<Transition
			className="p-1 duration-300 bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-white  sm:ring-violet-300 sm:ring-2 md:ring-0"
			show={menuShow}
			enter="transition duration-100 ease-out"
			enterFrom="transform scale-95 opacity-0"
			enterTo="transform scale-100 opacity-100"
			leave="transition duration-75 ease-out"
			leaveFrom="transform scale-100 opacity-100"
			leaveTo="transform scale-95 opacity-0"
		>
			<Link href="/content">
				<button className="text-2xl p-3 text-violet-300">M</button>
			</Link>
			{menuList &&
				menuList.length &&
				menuList.map(menu => {
					return (
						<div key={menu.title}>
							<Disclosure>
								<Disclosure.Button>
									<div className="flex items-center text-lg p-3 hover:text-violet-500 dark:hover:text-violet-300">
										{menu.title}
										{menu.children &&
										menu.children.length ? (
											<ChevronDownIcon
												className="ml-2 h-6 w-6 hover:text-violet-500 dark:hover:text-violet-300 duration-300 ui-open:rotate-180 ui-open:transform"
												aria-hidden="true"
											/>
										) : (
											<div className="w-8"></div>
										)}
									</div>
								</Disclosure.Button>
								<Transition
									enter="transition duration-100 ease-out"
									enterFrom="transform scale-95 opacity-0"
									enterTo="transform scale-100 opacity-100"
									leave="transition duration-75 ease-out"
									leaveFrom="transform scale-100 opacity-100"
									leaveTo="transform scale-95 opacity-0"
								>
									<Disclosure.Panel>
										{menu.children &&
											menu.children.length &&
											menu.children.map(child => (
												<div key={child.title}>
													<Link
														href={child.path || '/'}
													>
														<div className="px-3 py-1 text-right sm:text-left hover:text-violet-500 dark:hover:text-violet-500 dark:hover:text-violet-300 cursor-pointer">
															{child.title}
														</div>
													</Link>
												</div>
											))}
									</Disclosure.Panel>
								</Transition>
							</Disclosure>
						</div>
					)
				})}
		</Transition>
	)
}

function MinimalismMenu({
	menuShow,
}: {
	menuShow: boolean
	setMenuShow: Function | null
}) {
	const [menuList, setMenuList] = useState<Menu>([])

	useEffect(() => {
		initMenu()
	}, [])

	const initMenu = async () => {
		const res = await fetch(`api/article/blogHomeGetArticleList/1/999`)

		const data = await res.json()
		const { code, result } = data
		if (code == 0) {
			let list =
				result.list &&
				result.list.map((v: any) => {
					return {
						id: v.id,
						title: v.article_title,
						path: '/content/posts/' + v.id,
					}
				})
			defaultMenuList[1].children = list

			setMenuList(defaultMenuList)
		}
	}

	return renderMenu({ menuList, menuShow })
}

export default MinimalismMenu
