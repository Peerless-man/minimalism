'use client'

import { useEffect, useState } from 'react'
import { MdPreview, MdCatalog } from 'md-editor-rt'
import 'md-editor-rt/lib/preview.css'

import { useDark } from '../../../../hooks/use-dark'
import { useCommonStore } from '../../../../hooks/use-common-store'

import {
	allEssayPosts,
	allVue2Posts,
	allVue3Posts,
	allReactPosts,
	EssayPosts,
	ReactPosts,
	Vue2Posts,
	Vue3Posts,
} from 'contentlayer/generated'

function Post({ params }: { params: { slug: string[] } }) {
	const { isDark } = useDark()
	const { catalogShow, onSetCatalogIconShow } = useCommonStore()
	const [loading, setLoading] = useState<Boolean>(false)
	const [post, setPost] = useState<
		Vue2Posts | Vue3Posts | EssayPosts | ReactPosts | null | undefined
	>(null)

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

		// 当进入文章才在header上展示目录展开按钮
		onSetCatalogIconShow()
		// 有文章才展示目录
		setScrollElement(document.getElementById('scrollElement'))
	}, [id])

	const getPostById = (type: string, id: string) => {
		let newPost:
			| Vue2Posts
			| Vue3Posts
			| EssayPosts
			| ReactPosts
			| null
			| undefined = null
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
	}

	if (loading || !post) {
		return (
			<div className="w-full h-full flex justify-center items-center">
				<span className="text-xl font-bold">Loading...</span>
			</div>
		)
	}

	return (
		<div id="scrollElement" className="flex h-full overflow-scroll">
			<MdPreview
				className="w-[100%] !bg-transparent"
				editorId={id}
				modelValue={post.body.raw}
				theme={isDark ? 'dark' : 'light'}
			/>
			<div
				className={`fixed duration-300 top-[40px] right-0 w-[30%] h-full overflow-auto md:sticky md:top-0 md:w-[20%] bg-slate-100 dark:bg-slate-900 ${
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
	)
}

export default Post
