'use client'

import React, { useEffect, useRef, useState } from 'react'
// md-editor-rt https://imzbf.github.io/md-editor-rt/
import { MdPreview, MdCatalog } from 'md-editor-rt'
import Image from 'next/image'
import { format, parseISO } from 'date-fns'
import './index.scss'
import 'md-editor-rt/lib/preview.css'

import { useCommonStore } from '../../../../hooks/use-common-store'
import { calcWorkCount } from 'utils/tool'
import { CalendarDaysIcon, BookOpenIcon } from '@heroicons/react/24/outline'
import { useTheme } from 'next-themes'
import { getPostById, getCurrentPostArr } from 'hooks/use-posts'

import { Post as PostType } from 'contentlayer.config'
import Link from 'next/link'

function Post({ params }: { params: { slug: string[] } }) {
	const bottomRef = useRef<any>(null)
	let observer: IntersectionObserver | null | undefined
	const { catalogShow, onSetMenuHide, onSetActiveId } = useCommonStore()
	const [post, setPost] = useState<PostType | undefined | null>(null)
	const [prev, setPrev] = useState<PostType | undefined | null>(null)
	const [next, setNext] = useState<PostType | undefined | null>(null)

	const [id] = useState('preview-only')
	const [scrollElement, setScrollElement] = useState<any>(null)

	const { resolvedTheme } = useTheme()

	const [isDark, setIsDark] = useState<boolean>(false)

	useEffect(() => {
		if (resolvedTheme == 'dark') {
			setIsDark(true)
		} else {
			setIsDark(false)
		}
	}, [resolvedTheme])

	useEffect(() => {
		observeNext()
	}, [post])

	useEffect(() => {
		if (params.slug && params.slug.length) {
			initPostById(
				params.slug[0],
				decodeURIComponent(params.slug.join('/') + '.mdx'),
			)
		}

		setScrollElement(document.documentElement)
		return () => {
			onSetActiveId('')
		}
	}, [params.slug])

	const initPostById = (type: string, id: string) => {
		let newPost = getPostById(type, id)

		setPost(newPost)
		onSetActiveId(id)
		document.title = newPost.category + '-' + newPost.title
		if (document.body.offsetWidth < 768) {
			onSetMenuHide()
		}
	}

	const observeNext = () => {
		observer = new IntersectionObserver(
			entries => {
				const loadingEntry = entries[0]

				if (loadingEntry.isIntersecting) {
					setPrevAndNext(
						params.slug[0],
						decodeURIComponent(params.slug.join('/') + '.mdx'),
					)

					observer?.disconnect()
					observer = null
				}
			},
			{
				threshold: 0.1,
			},
		)

		bottomRef.current && observer.observe(bottomRef.current) // 观察尾部元素
	}

	const setPrevAndNext = (type: string = '', id: string = '') => {
		if (!type || !id) return
		let arr: any = getCurrentPostArr(type)
		let next = null,
			prev = null,
			index = -1
		index = arr.findIndex((item: any) => item._id == id)

		if (index != -1) {
			if (index > 0) {
				prev = arr[index - 1]
			}

			if (index + 1 < arr.length) {
				next = arr[index + 1]
			}
		}

		if (prev) {
			setPrev(prev)
		}

		if (next) {
			setNext(next)
		}
	}

	if (!post) {
		return (
			<div className="w-full">
				<div className="text-xl font-bold mt-20 ml-20">Loading...</div>
			</div>
		)
	}

	if (!post.show) {
		return (
			<div className="w-full">
				<div className="text-xl font-bold mt-20 ml-20">
					小张把它隐藏了起来
				</div>
			</div>
		)
	}

	function renderHeader(post: PostType) {
		if (!post.header) return

		return (
			<div className="w-[100%] h-60 md:h-96 relative px-[10px] md:px-[20px]">
				<Image
					className="w-[100%] h-[100%] object-cover"
					alt={post.category}
					width={1000}
					height={600}
					src={post.header}
					priority
				/>
			</div>
		)
	}

	return (
		<div className="pt-16 flex">
			<div className={`${catalogShow ? 'w-[80%]' : 'w-[100%]'}  h-full`}>
				{renderHeader(post)}
				<div className="text-left px-[10px] md:px-[20px]">
					<h1 className="text-3xl font-bold pt-5 pb-1">
						{post.title}
					</h1>
					<div className="flex items-center py-1">
						<BookOpenIcon className="w-6 h-6 mr-2" />
						<h3 className="text-md mr-3">{post.category}</h3>
					</div>
					<div className="flex justify-between items-center py-1">
						<div className="flex items-center">
							<CalendarDaysIcon className="w-6 h-6 mr-2" />
							<h3 className="text-sm">
								{format(parseISO(post.date), 'LLLL d, yyyy')}
							</h3>
						</div>
						<div className="flex items-center py-1">
							<span className="text-sm">字数：</span>
							<h3 className="text-sm">
								{calcWorkCount(post.wordCount)}
							</h3>
						</div>
					</div>
				</div>
				<MdPreview
					className="!bg-transparent"
					editorId={id}
					modelValue={post.body.raw}
					theme={isDark ? 'dark' : 'light'}
					previewTheme="github"
				/>
				<div
					ref={bottomRef}
					className="flex justify-between items-center px-[10px] md:px-[20px] pt-0 pb-24"
				>
					<div>
						{prev && prev.show && (
							<Link
								className="px-5 py-2 ring-2 duration-300 ring-gray-500 dark:ring-slate-500  hover:text-violet-500 dark:hover:text-violet-300 hover:ring-violet-500 dark:hover:ring-violet-300 rounded-full "
								href={'/content/posts/' + prev.url}
							>
								上一篇
							</Link>
						)}
					</div>
					<div>
						{next && next.show && (
							<Link
								className="px-5 py-2 ring-2 duration-300 ring-gray-500 dark:ring-slate-500 hover:text-violet-500 dark:hover:text-violet-300 hover:ring-violet-500 dark:hover:ring-violet-300 rounded-full "
								href={'/content/posts/' + next.url}
							>
								下一篇
							</Link>
						)}
					</div>
				</div>
			</div>
			<div className="w-[0] md:w-[20%] relative overflow-hidden">
				<div
					className={`fixed duration-300  h-[calc(100vh-56px)] pb-8 overflow-auto bg-white dark:bg-slate-900 ${
						catalogShow ? 'block' : 'hidden'
					}`}
					style={{ width: 'inherit' }}
				>
					<MdCatalog
						style={{ maxWidth: 'inherit' }}
						editorId={id}
						offsetTop={80}
						scrollElementOffsetTop={60}
						scrollElement={scrollElement}
					/>
				</div>
			</div>
		</div>
	)
}

export default Post
