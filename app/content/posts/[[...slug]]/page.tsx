'use client'

import { useEffect, useState } from 'react'
import { MdPreview, MdCatalog } from 'md-editor-rt'
import Image from 'next/image'
import { format, parseISO } from 'date-fns'
import './index.scss'

import 'md-editor-rt/lib/preview.css'

import { useDark } from '../../../../hooks/use-dark'
import { useCommonStore } from '../../../../hooks/use-common-store'
import { CalendarDaysIcon, BookOpenIcon } from '@heroicons/react/24/outline'

import {
	allEssayPosts,
	allVue2Posts,
	allVue3Posts,
	allReactPosts,
} from 'contentlayer/generated'
import { Post as PostType } from 'contentlayer.config'

function Post({ params }: { params: { slug: string[] } }) {
	const { isDark } = useDark()
	const { catalogShow, onSetMenuHide } = useCommonStore()
	const [loading, setLoading] = useState<Boolean>(false)
	const [post, setPost] = useState<PostType | undefined | null>(null)

	const [id] = useState('preview-only')
	const [scrollElement, setScrollElement] = useState<any>(null)

	useEffect(() => {
		setLoading(true)
		if (params.slug && params.slug.length) {
			getPostById(
				params.slug[0],
				decodeURIComponent(params.slug.join('/') + '.mdx'),
			)
		}

		// 有文章才展示目录
		setScrollElement(document.getElementById('scrollElement'))
	}, [id])

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
		setLoading(false)
		if (document.body.offsetWidth < 768) {
			onSetMenuHide()
		}
	}

	if (loading || !post) {
		return (
			<div className="w-full h-full flex justify-center items-center">
				<span className="text-xl font-bold">Loading...</span>
			</div>
		)
	}

	function renderHeader(post: PostType) {
		if (!post.header) return

		return (
			<div className="w-[80%] h-60 relative px-[10px] md:px-[20px]">
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
		<div id="scrollElement" className="w-full h-full pt-16 overflow-auto">
			{renderHeader(post)}
			<div className="text-left px-[10px] md:px-[20px]">
				<h1 className="text-3xl font-bold pt-5 pb-1">{post.title}</h1>
				<div className="flex items-center py-1">
					<BookOpenIcon className="w-6 h-6 mr-2" />
					<h3 className="text-md">{post.category}</h3>
				</div>
				<div className="flex items-center py-1">
					<CalendarDaysIcon className="w-6 h-6 mr-2" />
					<h3 className="text-sm">
						{format(parseISO(post.date), 'LLLL d, yyyy')}
					</h3>
				</div>
			</div>
			<div className="sticky top-[60px] w-full h-full overflow-y-scroll flex">
				<MdPreview
					className="w-[100%] !bg-transparent"
					editorId={id}
					modelValue={post.body.raw}
					theme={isDark ? 'dark' : 'light'}
				/>
				<div
					className={`duration-300 h-full overflow-auto w-[20%] bg-white dark:bg-slate-900 ${
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
