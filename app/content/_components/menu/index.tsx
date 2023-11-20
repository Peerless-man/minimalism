'use client'
import React, { useEffect, useState } from 'react'
import { Disclosure, Transition } from '@headlessui/react'
import Link from 'next/link'

import { debounce } from '../../../../utils/tool'

import {
	ChevronDownIcon,
	Bars3BottomLeftIcon,
	Bars3BottomRightIcon,
} from '@heroicons/react/20/solid'
import { Menu } from '../../../../type/menu.type'

const defaultMenuList: Menu = [
	{
		title: '小张的主页',
		path: '/',
	},
	{
		title: '小张的随笔',
		children: [
			{
				title: 'essay1',
				path: '/essays/1',
			},
			{
				title: 'essay2',
				path: '/essays/2',
			},
		],
	},
	{
		title: '小张的技术文章',
	},
]

function MinimalismMenu() {
	const [menuShow, setMenuShow] = useState<boolean | undefined>(true)

	const [menuList, setMenuList] = useState<Menu>([])

	useEffect(() => {
		judgeDeviceSize()
		window.addEventListener('resize', debounceJudgeDeviceSize)
		initMenu()
		return () => {
			window.removeEventListener('resize', debounceJudgeDeviceSize)
		}
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
						path: '/posts?id=' + v.id,
					}
				})
			defaultMenuList[2].children = list

			setMenuList(defaultMenuList)
		}
	}

	const judgeDeviceSize = () => {
		const body = document.body.offsetWidth
		if (body <= 768) {
			setMenuShow(false)
		} else {
			setMenuShow(true)
		}
	}

	const debounceJudgeDeviceSize = debounce(judgeDeviceSize, 50)

	return (
		<div className="p-3">
			{menuShow ? (
				<Bars3BottomRightIcon
					className="md:hidden h-6 w-6 text-violet-100 hover:text-violet-300 duration-300 ui-open:rotate-180 ui-open:transform"
					aria-hidden="true"
					onClick={() => setMenuShow(false)}
				/>
			) : (
				<Bars3BottomLeftIcon
					className="md:hidden h-6 w-6  text-violet-100 hover:text-violet-300 duration-300 ui-open:rotate-180 ui-open:transform"
					aria-hidden="true"
					onClick={() => setMenuShow(true)}
				/>
			)}

			<Transition
				show={menuShow}
				enter="transition duration-100 ease-out"
				enterFrom="transform scale-95 opacity-0"
				enterTo="transform scale-100 opacity-100"
				leave="transition duration-75 ease-out"
				leaveFrom="transform scale-100 opacity-100"
				leaveTo="transform scale-95 opacity-0"
			>
				<div className="mt-1 flex flex-col justify-items-start items-end  sm:items-start  sm:ring-violet-300 sm:ring-2 sm:rounded-lg md:ring-0">
					<Link href="/">
						<button className="text-lg p-3 text-violet-300">
							总有些惊奇的际遇
						</button>
					</Link>

					{menuList &&
						menuList.length &&
						menuList.map(menu => {
							return (
								<div key={menu.title}>
									<Disclosure>
										<Disclosure.Button>
											<div className="flex items-center p-3 text-violet-100 hover:text-violet-300">
												{menu.title}
												{menu.children &&
												menu.children.length ? (
													<ChevronDownIcon
														className="ml-2 h-6 w-6 text-violet-100 hover:text-violet-300 duration-300 ui-open:rotate-180 ui-open:transform"
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
																href={
																	child.path ||
																	'/'
																}
															></Link>
															<div className="mr-8 px-3 text-right sm:text-left text-violet-100 hover:text-violet-300 cursor-pointer">
																{child.title}
															</div>
														</div>
													))}
											</Disclosure.Panel>
										</Transition>
									</Disclosure>
								</div>
							)
						})}
				</div>
			</Transition>
		</div>
	)
}

export default MinimalismMenu
