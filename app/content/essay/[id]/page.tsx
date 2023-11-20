'use client'

import { useEffect, useState } from 'react'

function Post({ params }: { params: { id: string | number } }) {
	const [post, setPost] = useState<any>({ id: '' })

	useEffect(() => {
		setPost({ id: params.id })
	}, [])

	return (
		<>
			{post.id}
			<span className="text-white">essay</span>
		</>
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
