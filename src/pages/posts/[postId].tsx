function Post({ post }: any) {
	return (
		<>
			{post.id}
			<span className="text-white">你好</span>
		</>
	)
}

// 此函数在构建时被调用
export async function getStaticPaths() {
	// 调用外部 API 获取博文列表

	let arr = ['1', '2', '3', '4', '5']
	// 据博文列表生成所有需要预渲染的路径
	const paths = arr.map(id => ({
		params: { postId: id },
	}))

	// We'll pre-render only these paths at build time.
	// { fallback: false } means other routes should 404.
	return { paths, fallback: false }
}

export async function getStaticProps({ params }: any) {
	// params 包含此片博文的 `id` 信息。
	// 如果路由是 /posts/1，那么 params.id 就是 1
	const post = {
		id: params.postId,
		title: '哈哈哈',
		content: '你好呀',
	}
	// 通过 props 参数向页面传递博文的数据
	return { props: { post } }
}

export default Post
