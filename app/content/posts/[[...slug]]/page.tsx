'use client'

import { useEffect, useState } from 'react'
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

import {
	allEssayPosts,
	allVue2Posts,
	allVue3Posts,
	allReactPosts,
} from 'contentlayer/generated'
import { Post as PostType } from 'contentlayer.config'
import Link from 'next/link'

function Post({ params }: { params: { slug: string[] } }) {
	const { catalogShow, onSetMenuHide, onSetActiveId } = useCommonStore()
	const [loading, setLoading] = useState<Boolean>(false)
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
		setLoading(true)
		if (params.slug && params.slug.length) {
			getPostById(
				params.slug[0],
				decodeURIComponent(params.slug.join('/') + '.mdx'),
			)
		}

		setScrollElement(document.documentElement)

		return () => {
			onSetActiveId('')
		}
	}, [params.slug])

	const getPostById = (type: string, id: string) => {
		let newPost: any = null
		switch (type) {
			case 'vue2':
				newPost = allVue2Posts.find(item => item._id == id)
				break
			case 'vue3':
				newPost = allVue3Posts.find(item => item._id == id)
				break
			case 'react':
				newPost = allReactPosts.find(item => item._id == id)
				break
			case 'essay':
				newPost = allEssayPosts.find(item => item._id == id)
				break
		}

		setPost(newPost)
		onSetActiveId(id)
		console.log(id)

		setPrevAndNext(type, id)
		document.title = newPost.category + '-' + newPost.title
		setLoading(false)
		if (document.body.offsetWidth < 768) {
			onSetMenuHide()
		}
	}

	const setPrevAndNext = (type: string = '', id: string = '') => {
		if (!type || !id) return
		let arr: any = []
		switch (type) {
			case 'vue2':
				arr = allVue2Posts
				break
			case 'vue3':
				arr = allVue3Posts
				break
			case 'react':
				arr = allReactPosts
				break
			case 'essay':
				arr = allEssayPosts
				break
		}
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

	if (loading || !post) {
		return (
			<div className="w-full h-[100vh] flex justify-center items-center">
				<span className="text-xl font-bold">Loading...</span>
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
			<div className="w-full h-full">
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
				/>
				<div className="flex justify-between items-center px-[10px] md:px-[20px] pb-10">
					<div>
						{prev && (
							<Link
								className="px-5 py-2 ring-2 duration-500 ring-gray-400 dark:ring-slate-500 hover:ring-green-400 dark:hover:ring-green-400 rounded-full "
								href={'/content/posts/' + prev.url}
							>
								上一篇
							</Link>
						)}
					</div>
					<div>
						{next && (
							<Link
								className="px-5 py-2 ring-2 duration-500 ring-gray-400 dark:ring-slate-500 hover:ring-green-400 dark:hover:ring-green-400 rounded-full "
								href={'/content/posts/' + next.url}
							>
								下一篇
							</Link>
						)}
					</div>
				</div>
			</div>
			<div className="w-[0] md:w-[10rem] relative">
				<div
					className={`fixed duration-300  h-[calc(100vh-56px)] overflow-auto w-[10rem] bg-white dark:bg-slate-900 ${
						catalogShow ? 'block' : 'hidden'
					}`}
				>
					<MdCatalog
						style={{ maxWidth: 'inherit' }}
						editorId={id}
						scrollElement={scrollElement}
					/>
				</div>
			</div>
		</div>
	)
}

export default Post
