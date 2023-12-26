'use client'
import React, { useEffect, useState } from 'react'

import { Disclosure, Transition } from '@headlessui/react'
import Link from 'next/link'
import {
	allVue2Posts,
	allVue3Posts,
	allEssayPosts,
	allReactPosts,
	allJavaScriptPosts,
} from 'contentlayer/generated'
import { compareDesc } from 'date-fns'

import { ChevronDownIcon } from '@heroicons/react/20/solid'

import { Menu, MenuItem } from '../../../../type/menu.type'
import { useCommonStore } from '../../../../hooks/use-common-store'

const defaultMenuList: Menu = [
	{
		title: '随笔',
		children: [],
	},
	{
		title: 'JavaScript',
		children: [],
	},
	{
		title: 'Vue2',
		children: [],
	},
	{
		title: 'Vue3',
		children: [],
	},
	{
		title: 'React',
		children: [],
	},
]

function renderMenu({
	menuList,
	activeId,
}: {
	menuList: Menu
	activeId: string
}) {
	if (!menuList.length) {
		return (
			<div className="hidden md:flex w-full h-full p-2 justify-center items-start">
				<span className="text-xl font-bold">Loading...</span>
			</div>
		)
	}

	return (
		<div className="min-h-[100vh] duration-300 bg-white dark:bg-slate-900 text-black dark:text-slate-400">
			{menuList && menuList.length
				? menuList.map(menu => {
						return (
							<div key={menu.title}>
								<Disclosure>
									<Disclosure.Button className="focus:outline-none">
										<div className="flex text-left items-center text-lg px-3 py-2 hover:text-violet-500 dark:hover:text-violet-300">
											{menu.title}
											{menu.children &&
											menu.children.length ? (
												<ChevronDownIcon
													className="focus:outline-none ml-2 w-6 h-6 hover:text-violet-500 dark:hover:text-violet-300 duration-300 ui-open:rotate-180 ui-open:transform"
													aria-hidden="true"
												/>
											) : (
												<div className="w-8"></div>
											)}
										</div>
									</Disclosure.Button>
									<Disclosure.Panel>
										{menu.children && menu.children.length
											? menu.children.map(child => (
													<div key={child.title}>
														<Link
															href={
																child.path ||
																'/'
															}
														>
															<div
																className={`${
																	activeId ==
																	child.id
																		? 'text-violet-500 dark:text-violet-300'
																		: ''
																} px-3 py-1 text-left  hover:text-violet-500 dark:hover:text-violet-300 cursor-pointer`}
															>
																{child.title}
															</div>
														</Link>
													</div>
											  ))
											: null}
									</Disclosure.Panel>
								</Disclosure>
							</div>
						)
				  })
				: null}
		</div>
	)
}

function MinimalismMenu() {
	const { menuShow, activeId } = useCommonStore()
	const [menuList, setMenuList] = useState<Menu>([])

	useEffect(() => {
		initMenu()
	}, [])

	// 组装菜单子项
	const initMenuChildren = (posts: any, order: boolean = true) => {
		let list: MenuItem[] = []

		// 排序
		order
			? posts.sort((a: any, b: any) =>
					compareDesc(new Date(b.date), new Date(a.date)),
			  )
			: posts.sort((a: any, b: any) =>
					compareDesc(new Date(a.date), new Date(b.date)),
			  )
		posts.forEach((v: any) => {
			v.show &&
				list.push({
					id: v._id,
					title: v.menuTitle || v.title,
					path: '/content/posts/' + v.url,
				})
		})

		return list
	}

	const initMenu = () => {
		// 日记
		const diaryPosts = initMenuChildren(allEssayPosts, false)
		// React
		const reactPosts = initMenuChildren(allReactPosts)
		// Vue2
		const vue2Posts = initMenuChildren(allVue2Posts)
		// Vue3
		const vue3Posts = initMenuChildren(allVue3Posts)
		// JavaScript
		const JavaScriptPosts = initMenuChildren(allJavaScriptPosts)

		defaultMenuList[0].children = diaryPosts
		defaultMenuList[1].children = JavaScriptPosts
		defaultMenuList[2].children = vue2Posts
		defaultMenuList[3].children = vue3Posts
		defaultMenuList[4].children = reactPosts

		setMenuList(defaultMenuList)
	}

	return (
		<Transition
			show={menuShow}
			className={`fixed w-[100%] md:w-[15rem]  h-[calc(100vh-56px)] bg-transparent z-50 overflow-auto`}
			enter="transition duration-300 ease-out"
			enterFrom="transform scale-95 opacity-0"
			enterTo="transform scale-100 opacity-100"
			leave="transition duration-75 ease-out"
			leaveFrom="transform scale-100 opacity-100"
			leaveTo="transform scale-95 opacity-0"
		>
			{renderMenu({ menuList, activeId })}
		</Transition>
	)
}

export default MinimalismMenu
