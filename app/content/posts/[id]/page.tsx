'use client'

import { useEffect, useState } from 'react'
import { MdPreview, MdCatalog } from 'md-editor-rt'
import 'md-editor-rt/lib/preview.css'

import { useDark } from '../../../../hooks/use-dark'
import { useCommonStore } from '../../../../hooks/use-common-store'

function Post({ params }: { params: { id: string | number } }) {
	const { isDark } = useDark()
	const { catalogShow, onSetCatalogIconShow } = useCommonStore()
	const [post, setPost] = useState<any>({ id: '', article_content: '' })

	const [id] = useState('preview-only')
	const [scrollElement, setScrollElement] = useState<any>(null)

	const getPostById = async (id: string | number) => {
		if (!id) return
		const res = await fetch('api/article/getArticleById/' + id)
		const data = await res.json()
		const { code, result } = data

		if (code == 0) {
			setPost(result)
		}
		// 当进入文章才在header上展示目录展开按钮
		onSetCatalogIconShow()
		// 有文章才展示目录
		setScrollElement(document.getElementById('scrollElement'))
	}

	useEffect(() => {
		getPostById(params.id)
	}, [id])

	if (!post.id) {
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
				modelValue={post.article_content}
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
