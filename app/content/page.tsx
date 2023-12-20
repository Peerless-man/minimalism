'use client'
import { useCommonStore } from 'hooks/use-common-store'
import { useEffect } from 'react'

export default function ContentPage() {
	const { onSetActiveId } = useCommonStore()

	useEffect(() => {
		onSetActiveId('')
	}, [])

	return (
		<>
			<div className="w-full h-full px-4 pt-16">
				<h1 className="text-2xl py-8 font-bold text-left">
					欢迎来到小张的前端面试网站
				</h1>
				<h3 className="text-xl leading-loose py-3">
					在这里我会分享vue、react、html、css、js的面试经验
				</h3>
				<h3 className="text-xl leading-loose">
					如果菜单里标注了了解就好 那就是不容易被面试官考
					但是开发中会遇到 了解就行 其他的一定要多去理解 都是高频率点
				</h3>
				<h3 className="text-xl leading-loose">持续更新中......</h3>
				<h3 className="text-md py-3">
					如果大家对知识点有什么疑问 或者是发现存在错误、不足的地方
					请在github上给我提个issue 留下您的联系方式 感谢
				</h3>
				<p className="text-md leading-loose py-3">
					如果觉得写的不错的话 可以去github给我点个star吗
					可以让更多人看到 谢谢
				</p>
			</div>
		</>
	)
}
