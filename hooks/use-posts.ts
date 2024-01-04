import {
	allEssayPosts,
	allVue2Posts,
	allVue3Posts,
	allReactPosts,
	allJavaScriptPosts,
} from 'contentlayer/generated'
import { compareDesc } from 'date-fns'
import { Menu, MenuItem } from '../type/menu.type'
import { Post } from 'contentlayer.config'

// 在这里定义 比如 essay 定义他的title 是 随笔 然后文章列表是 allEssayPosts 就可以自动生成菜单了
const allPosts: Record<string, any> = {
	essay: {
		title: '随笔',
		posts: allEssayPosts,
	},
	javaScript: {
		title: 'JavaScript',
		posts: allJavaScriptPosts,
	},
	vue2: {
		title: 'Vue2',
		posts: allVue2Posts,
	},
	vue3: {
		title: 'Vue3',
		posts: allVue3Posts,
	},
	react: {
		title: 'React',
		posts: allReactPosts,
	},
}

let defaultMenuList: Menu = []

const getPostById = (type: string, id: string) => {
	let newPost: any = allPosts[type].posts.find((item: Post) => item._id == id)

	return newPost
}

const getCurrentPostArr = (type: string) => {
	if (!type) return

	return allPosts[type].posts
}

const initMenu = () => {
	defaultMenuList = []
	Object.keys(allPosts).forEach(v => {
		let flag = true
		if (v == 'essay') {
			// 如果是随笔 则需要另外一种排序方式
			flag = false
		}
		defaultMenuList.push({
			id: allPosts[v].title,
			title: allPosts[v].title,
			children: initMenuChildren(allPosts[v].posts, flag),
		})
	})

	return defaultMenuList
}

// 组装菜单子项
const initMenuChildren = (posts: any, order: boolean = true) => {
	let list: MenuItem[] = []

	// 排序
	order
		? posts.sort((a: any, b: any) =>
				compareDesc(new Date(b.date), new Date(a.date)),
		  )
		: posts.sort((a: any, b: any) =>
				compareDesc(new Date(a.date), new Date(b.date)),
		  )
	posts.forEach((v: any) => {
		v.show &&
			list.push({
				id: v._id,
				title: v.menuTitle || v.title,
				path: '/content/posts/' + v.url,
			})
	})

	return list
}

export { getPostById, initMenu, getCurrentPostArr }
