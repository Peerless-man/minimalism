import Image from 'next/image'
import { Fragment } from 'react'
import { Popover, Transition } from '@headlessui/react'

import bilibili from '/assets/icons/bilibili.svg'
import tengxunQQ from '/assets/icons/tengxunQQ.svg'
import twitter from '/assets/icons/twitter.svg'
import wangyiyunyinle from '/assets/icons/wangyiyunyinle.svg'
import weixin from '/assets/icons/weixin.svg'

type FrameWork = {
	id: string
	title: string
	label: string
	url: string
}

const frameWorkList: FrameWork[] = [
	{
		id: '1',
		label: 'React',
		url: 'https://react.docschina.org/',
		title: '用于构建 Web 和原生交互界面的库',
	},
	{
		id: '2',
		label: 'Next',
		url: 'https://www.nextjs.cn/',
		title: 'Next.js 为您提供生产环境所需的所有功能以及最佳的开发体验：包括静态及服务器端融合渲染、 支持 TypeScript、智能化打包、 路由预取等功能 无需任何配置。',
	},
	{
		id: '3',
		label: 'Tailwind',
		url: 'https://www.tailwindcss.cn/',
		title: '只需书写 HTML 代码，无需书写 CSS，即可快速构建美观的网站。',
	},
	{
		id: '4',
		label: 'contentlayer',
		url: 'https://contentlayer.dev/docs/getting-started-cddd76b7',
		title: 'Contentlayer is a content SDK that validates and transforms your content into type-safe JSON data you can easily import into your application.',
	},
	{
		id: '5',
		label: 'zustand',
		url: 'https://zustand-demo.pmnd.rs/',
		title: `A small, fast, and scalable bearbones state management solution. Zustand has a comfy API based on hooks. It isn't boilerplatey or opinionated, but has enough convention to be explicit and flux-like.`,
	},
	{
		id: '6',
		label: 'next-themes',
		url: 'https://github.com/pacocoursey/next-themes',
		title: '切换Next项目主题',
	},
	{
		id: '7',
		label: 'TypeScript',
		url: 'https://www.tslang.cn/index.html',
		title: 'TypeScript是JavaScript类型的超集',
	},
]

export default function Footer() {
	const goTo = (type: string) => {
		let url: string = ''
		switch (type) {
			case 'b':
				url =
					'https://space.bilibili.com/419858932?spm_id_from=333.1007.0.0'
				break
			case 't':
				url = 'https://twitter.com/zhang487311'
				break
			case 'q':
				url =
					'https://wpa.qq.com/msgrd?v=3&uin=2715158815&site=qq&menu=yes&jumpflag=1'
				break
			case 'w':
				url = ''
				break
			case 'm':
				url = 'https://music.163.com/#/user/home?id=2012876813'
				break
		}

		window.open(url)
	}

	const goToFramework = (url: string) => {
		if (!url) return
		window.open(url)
	}

	return (
		<>
			<div className="flex items-start justify-between flex-wrap p-5 duration-300 border-t-2 border-rose-200 hover:border-purple-300 rounded-lg bg-white dark:bg-slate-900 text-black dark:text-slate-400">
				<div className="w-[100%] md:w-[50%] text-left p-5">
					<h3 className="text-2xl leading-9">我是小张</h3>
					<h3 className="text-xl leading-9">欢迎来到我的小站</h3>
					<h3 className="text-xl leading-9">
						这里有我的随笔、前端面试经验
					</h3>
					<h3 className="text-xl leading-9">持续输出中......</h3>
				</div>
				<div className="w-[100%] md:w-[50%] text-left p-5 ">
					<h3 className="text-2xl leading-9">喜欢花里胡哨的看这里</h3>
					<div>
						<a
							className="ml-1 underline underline-offset-1 text-xl duration-300 hover:text-violet-400 dark:hover:text-violet-300"
							href="http://mrzym.top"
							target="_blank"
						>
							小张的个人博客-vue3
						</a>
					</div>
					<div>
						<a
							className="ml-1 underline underline-offset-1 text-xl duration-300 hover:text-violet-400 dark:hover:text-violet-300"
							href="http://mrzym.top/nextm"
							target="_blank"
						>
							小张的个人主页-next
						</a>
					</div>
					<div className="flex flex-wrap items-center py-3 cursor-pointer">
						<Image
							className="dark:bg-white rounded-lg mr-1 p-1 duration-300 hover:-translate-y-1"
							alt="Bilibili"
							src={bilibili}
							width={30}
							height={30}
							style={{ objectFit: 'cover' }}
							onClick={() => goTo('b')}
						/>
						<Image
							className="dark:bg-white rounded-lg mr-1 p-1 duration-300 hover:-translate-y-1"
							alt="NetEase Cloud"
							src={wangyiyunyinle}
							width={30}
							height={30}
							style={{ objectFit: 'cover' }}
							onClick={() => goTo('m')}
						/>
						<Image
							className="dark:bg-white rounded-lg mr-1 p-1 duration-300 hover:-translate-y-1"
							alt="QQ"
							src={tengxunQQ}
							width={30}
							height={30}
							style={{ objectFit: 'cover' }}
							onClick={() => goTo('q')}
						/>
						<Popover className="relative flex">
							<Popover.Button>
								<Image
									className="dark:bg-white rounded-lg mr-1 p-1 duration-300 hover:-translate-y-1"
									alt="WeChat"
									src={weixin}
									width={30}
									height={30}
									style={{ objectFit: 'cover' }}
								/>
							</Popover.Button>
							<Transition
								as={Fragment}
								enter="transition ease-out duration-200"
								enterFrom="opacity-0 translate-y-1"
								enterTo="opacity-100 translate-y-0"
								leave="transition ease-in duration-150"
								leaveFrom="opacity-100 translate-y-0"
								leaveTo="opacity-0 translate-y-1"
							>
								<Popover.Panel className="absolute -left-8 bottom-12 z-10">
									<div className="px-2 py-1 bg-white  dark:bg-slate-700 rounded-lg">
										M2715158815
									</div>
								</Popover.Panel>
							</Transition>
						</Popover>
						<Image
							className="dark:bg-white rounded-lg mr-1 p-1 duration-300 hover:-translate-y-1"
							alt="Twitter"
							src={twitter}
							width={30}
							height={30}
							style={{ objectFit: 'cover' }}
							onClick={() => goTo('t')}
						/>
					</div>
				</div>
				<div className="w-[100%] md:w-[50%] text-left p-5">
					<h3 className="text-2xl leading-9">本站技术栈</h3>
					<h3 className="text-xl leading-9 cursor-pointer">
						{Array.isArray(frameWorkList) && frameWorkList.length
							? frameWorkList.map((frame, index) => {
									return (
										<span key={frame.id}>
											<span
												className="duration-300 hover:text-violet-400 dark:hover:text-violet-300"
												title={frame.title}
												onClick={() =>
													goToFramework(frame.url)
												}
											>
												{frame.label}
											</span>
											{index + 1 == frameWorkList.length
												? ''
												: '、'}
										</span>
									)
							  })
							: null}
					</h3>
				</div>
			</div>
		</>
	)
}
