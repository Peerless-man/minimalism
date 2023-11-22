'use client'

import { useEffect, useState, useContext } from 'react'
import { MdPreview, MdCatalog } from 'md-editor-rt'
import 'md-editor-rt/lib/preview.css'

import { useDark } from '../../../../hooks/use-dark'
import { useCommonStore } from '../../../../hooks/use-common-store'
import { CatalogContext } from '../../_components/layout'

function Post({ params }: { params: { id: string | number } }) {
	const { isDark } = useDark()
	const { onSetCatalogIconShow, onSetCatalogIconHide } = useCommonStore()
	const Catalog = useContext(CatalogContext)
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
		setScrollElement(document.getElementById('scrollElement'))
	}

	useEffect(() => {
		return () => {
			// 退出关闭在头部里展示目录按钮
			onSetCatalogIconHide()
		}
	}, [])

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
			{Catalog.logShow && (
				<div className="sm:fixed sm:top-0 sm:right-0 sm:w-[30%] h-full overflow-auto md:sticky top-0 md:w-[20%]">
					<MdCatalog
						style={{ maxWidth: 'inherit' }}
						editorId={id}
						scrollElement={scrollElement}
					/>
				</div>
			)}
		</div>
	)
}

// 此函数在构建时被调用
// export async function getStaticPaths() {
// 	// 调用外部 API 获取博文列表
// 	const res = await fetch(`api/article/blogHomeGetArticleList/1/999`)

// 	const data = await res.json()
// 	const { code, result } = data
// 	let paths
// 	// 据博文列表生成所有需要预渲染的路径
// 	if (code == 0) {
// 		paths =
// 			result.list &&
// 			result.list.map((v: any) => ({
// 				params: { postId: v.id },
// 			}))
// 	}

// 	// We'll pre-render only these paths at build time.
// 	// { fallback: false } means other routes should 404.
// 	return { paths, fallback: false }
// }

// export async function getStaticProps({ params }: any) {
// 	// params 包含此片博文的 `id` 信息。
// 	// 如果路由是 /posts/1，那么 params.id 就是 1
// 	const post = {
// 		id: params.postId,
// 		title: '哈哈哈',
// 		content: '你好呀',
// 	}
// 	// 通过 props 参数向页面传递博文的数据
// 	return { props: { post } }
// }

export default Post
