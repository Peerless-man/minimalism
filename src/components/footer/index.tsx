import Image from 'next/image'
import { Fragment } from 'react'
import { Popover, Transition } from '@headlessui/react'

import bilibili from '@/assets/icons/bilibili.svg'
import tengxunQQ from '@/assets/icons/tengxunQQ.svg'
import twitter from '@/assets/icons/twitter.svg'
import wangyiyunyinle from '@/assets/icons/wangyiyunyinle.svg'
import weixin from '@/assets/icons/weixin.svg'

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
	return (
		<>
			<div className="flex items-start justify-between flex-wrap p-5 border-t-2 border-rose-200 hover:border-purple-300 rounded-lg">
				<div className="w-[100%] md:w-[50%] text-white text-left p-5">
					<h1 className="text-3xl leading-9">Hello</h1>
					<h3 className="text-xl leading-9">我是小张</h3>
					<h3 className="text-xl leading-9">欢迎来到我的小站</h3>
					<h3 className="text-xl leading-9">
						这里装满了我的随笔、技术文章
					</h3>
				</div>
				<div className="w-[100%] md:w-[50%] text-white text-left p-5 ">
					<h3 className="text-3xl leading-9">More</h3>
					<h3 className="text-xl leading-9">喜欢花里胡哨的点这里</h3>
					<div>
						<a
							className="ml-1 underline underline-offset-1 text-sm"
							href="http://mrzym.top"
							target="_blank"
						>
							小张的个人博客-vue3
						</a>
					</div>
					<div>
						<a
							className="ml-1 underline underline-offset-1 text-sm"
							href="http://mrzym.top/nextm"
							target="_blank"
						>
							小张的个人主页-next
						</a>
					</div>
					<div className="flex flex-wrap items-center py-1 cursor-pointer">
						<Image
							className="bg-slate-300 rounded-lg m-1 p-1 duration-300 hover:bg-white"
							alt="Bilibili"
							src={bilibili}
							width={30}
							height={30}
							style={{ objectFit: 'cover' }}
							onClick={() => goTo('m')}
						/>
						<Image
							className="bg-slate-300 rounded-lg m-1 p-1 duration-300 hover:bg-white"
							alt="NetEase Cloud"
							src={wangyiyunyinle}
							width={30}
							height={30}
							style={{ objectFit: 'cover' }}
							onClick={() => goTo('b')}
						/>
						<Image
							className="bg-slate-300 rounded-lg m-1 p-1 duration-300 hover:bg-white"
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
									className="bg-slate-300 rounded-lg m-1 p-1 duration-300 hover:bg-white"
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
									<div className="px-2 py-1 bg-slate-300 rounded-lg">
										M2715158815
									</div>
								</Popover.Panel>
							</Transition>
						</Popover>
						<Image
							className="bg-slate-300 rounded-lg m-1 p-1 duration-300 hover:bg-white"
							alt="Twitter"
							src={twitter}
							width={30}
							height={30}
							style={{ objectFit: 'cover' }}
							onClick={() => goTo('t')}
						/>
					</div>
				</div>
			</div>
		</>
	)
}
