'use client'
import React, { useEffect, useState } from 'react'
import { Disclosure, Transition } from '@headlessui/react'
import Link from 'next/link'
import {
	allVue2Posts,
	allVue3Posts,
	allEssayPosts,
	allReactPosts,
	ReactPosts,
	EssayPosts,
	Vue2Posts,
	Vue3Posts,
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
	menuShow,
}: {
	menuList: Menu
	menuShow: boolean | undefined
}) {
	if (!menuList.length) {
		return (
			<div className="hidden md:flex w-full h-full p-2 justify-center items-start">
				<span className="text-xl font-bold">Loading...</span>
			</div>
		)
	}

	return (
		<div className="h-full duration-300 bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-white  ring-violet-300 ring-2 md:ring-0">
			{menuList && menuList.length
				? menuList.map(menu => {
						return (
							<div key={menu.title}>
								<Disclosure>
									<Disclosure.Button>
										<div className="flex text-left items-center text-lg px-3 py-2 hover:text-violet-500 dark:hover:text-violet-300">
											{menu.title}
											{menu.children &&
											menu.children.length ? (
												<ChevronDownIcon
													className="ml-2 h-8 w-8 hover:text-violet-500 dark:hover:text-violet-300 duration-300 ui-open:rotate-180 ui-open:transform"
													aria-hidden="true"
												/>
											) : (
												<div className="w-8"></div>
											)}
										</div>
									</Disclosure.Button>
									<Transition
										enter="transition duration-300 ease-out"
										enterFrom="transform scale-95 opacity-0"
										enterTo="transform scale-00 opacity-100"
										leave="transition duration-75 ease-out"
										leaveFrom="transform scale-100 opacity-100"
										leaveTo="transform scale-95 opacity-0"
									>
										<Disclosure.Panel>
											{menu.children &&
											menu.children.length
												? menu.children.map(child => (
														<div key={child.title}>
															<Link
																href={
																	child.path ||
																	'/'
																}
															>
																<div className="px-3 py-1 text-left  hover:text-violet-500 dark:hover:text-violet-300 cursor-pointer">
																	{
																		child.title
																	}
																</div>
															</Link>
														</div>
												  ))
												: null}
										</Disclosure.Panel>
									</Transition>
								</Disclosure>
							</div>
						)
				  })
				: null}
		</div>
	)
}

function MinimalismMenu() {
	const { menuShow } = useCommonStore()
	const [menuList, setMenuList] = useState<Menu>([])

	useEffect(() => {
		initMenu()
	}, [])

	// 组装菜单子项
	const initMenuChildren = (
		posts: EssayPosts[] | ReactPosts[] | Vue2Posts[] | Vue3Posts[],
	) => {
		let list: MenuItem[] = []

		// 排序
		posts.sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)))
		posts.forEach((v: EssayPosts | ReactPosts | Vue2Posts | Vue3Posts) => {
			list.push({
				id: v._id,
				title: v.title,
				path: '/content/posts/' + v.url,
			})
		})

		return list
	}

	const initMenu = () => {
		// 日记
		const diaryPosts = initMenuChildren(allEssayPosts)
		// React
		const reactPosts = initMenuChildren(allReactPosts)
		// Vue2
		const vue2Posts = initMenuChildren(allVue2Posts)
		// Vue3
		const vue3Posts = initMenuChildren(allVue3Posts)

		defaultMenuList[0].children = diaryPosts
		defaultMenuList[1].children = vue2Posts
		defaultMenuList[2].children = vue3Posts
		defaultMenuList[3].children = reactPosts

		setMenuList(defaultMenuList)
	}

	return (
		<Transition
			show={menuShow}
			className={`fixed left-0 top-16 md:top-0 w-[100%] md:sticky  h-[calc(100vh-60px)] bg-transparent  z-40 overflow-auto`}
			enter="transition duration-300 ease-out"
			enterFrom="transform scale-95 opacity-0"
			enterTo="transform scale-100 opacity-100"
			leave="transition duration-75 ease-out"
			leaveFrom="transform scale-100 opacity-100"
			leaveTo="transform scale-95 opacity-0"
		>
			{renderMenu({ menuList, menuShow })}
		</Transition>
	)
}

export default MinimalismMenu
