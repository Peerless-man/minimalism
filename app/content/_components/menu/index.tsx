'use client'
import React, { useEffect, useState } from 'react'
import { Disclosure, Transition } from '@headlessui/react'
import Link from 'next/link'
import {
	DiaryPosts,
	allDiaryPosts,
	allVuePosts,
	allReactPosts,
	ReactPosts,
	VuePosts,
} from 'contentlayer/generated'
import { compareDesc } from 'date-fns'

import { ChevronDownIcon, HomeIcon } from '@heroicons/react/20/solid'

import { Menu, MenuItem } from '../../../../type/menu.type'
import { useCommonStore } from '../../../../hooks/use-common-store'

const defaultMenuList: Menu = [
	{
		title: '日记',
		children: [],
	},
	{
		title: 'Vue',
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
		<Transition
			className="duration-300 bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-white  ring-violet-300 ring-2 md:ring-0"
			show={menuShow}
			enter="transition duration-100 ease-out"
			enterFrom="transform scale-95 opacity-0"
			enterTo="transform scale-100 opacity-100"
			leave="transition duration-75 ease-out"
			leaveFrom="transform scale-100 opacity-100"
			leaveTo="transform scale-95 opacity-0"
		>
			{/* <div className="w-full h-12 fixed"> */}
			{/* <div className="absolute left-3 top-3"> */}
			<div className="flex items-center p-3">
				<Link href="/">
					<HomeIcon
						className="h-6 w-6   hover:text-violet-500 dark:hover:text-violet-300 duration-300"
						aria-hidden="true"
					/>
				</Link>
			</div>
			{/* </div> */}

			{menuList &&
				menuList.length &&
				menuList.map(menu => {
					return (
						<div key={menu.title}>
							<Disclosure>
								<Disclosure.Button>
									<div className="flex items-center text-lg px-3 py-2 hover:text-violet-500 dark:hover:text-violet-300">
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
														<div className="px-3 py-1 text-left  hover:text-violet-500 dark:hover:text-violet-300 cursor-pointer">
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

function MinimalismMenu() {
	const { menuShow } = useCommonStore()
	const [menuList, setMenuList] = useState<Menu>([])

	useEffect(() => {
		initMenu()
	}, [])

	// 组装菜单子项
	const initMenuChildren = (
		posts: DiaryPosts[] | ReactPosts[] | VuePosts[],
	) => {
		let list: MenuItem[] = []

		// 排序
		posts.sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)))
		posts.forEach((v: DiaryPosts | ReactPosts | VuePosts) => {
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
		const diaryPosts = initMenuChildren(allDiaryPosts)
		// React
		const reactPosts = initMenuChildren(allReactPosts)
		// Vue
		const vuePosts = initMenuChildren(allVuePosts)

		defaultMenuList[0].children = diaryPosts
		defaultMenuList[1].children = reactPosts
		defaultMenuList[2].children = vuePosts

		setMenuList(defaultMenuList)
	}

	return (
		menuShow && (
			<div
				className={`fixed left-0 top-[40px] md:top-0 w-[60%] md:sticky md:w-[25%] h-[calc(100vh-45px)] bg-transparent  z-40 overflow-auto`}
			>
				{renderMenu({ menuList, menuShow })}
			</div>
		)
	)
}

export default MinimalismMenu
