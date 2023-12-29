import {
	allEssayPosts,
	allVue2Posts,
	allVue3Posts,
	allReactPosts,
	allJavaScriptPosts,
} from 'contentlayer/generated'
import { compareDesc } from 'date-fns'
import { Menu, MenuItem } from '../type/menu.type'

const defaultMenuList: Menu = [
	{
		title: '随笔',
		children: [],
	},
	{
		title: 'JavaScript',
		children: [],
	},
	{
		title: 'Vue2',
		children: [],
	},
	{
		title: 'Vue3',
		children: [],
	},
	{
		title: 'React',
		children: [],
	},
]

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
		case 'javaScript':
			newPost = allJavaScriptPosts.find(item => item._id == id)
			break
	}

	return newPost
}

const getCurrentPostArr = (type: string) => {
	if (!type) return
	let arr: any = []
	switch (type) {
		case 'vue2':
			arr = allVue2Posts
			break
		case 'vue3':
			arr = allVue3Posts
			break
		case 'react':
			arr = allReactPosts
			break
		case 'essay':
			arr = allEssayPosts
			break
	}

	return arr
}

const initMenu = () => {
	// 日记
	const diaryPosts = initMenuChildren(allEssayPosts, false)
	// React
	const reactPosts = initMenuChildren(allReactPosts)
	// Vue2
	const vue2Posts = initMenuChildren(allVue2Posts)
	// Vue3
	const vue3Posts = initMenuChildren(allVue3Posts)
	// JavaScript
	const JavaScriptPosts = initMenuChildren(allJavaScriptPosts)

	defaultMenuList[0].children = diaryPosts
	defaultMenuList[1].children = JavaScriptPosts
	defaultMenuList[2].children = vue2Posts
	defaultMenuList[3].children = vue3Posts
	defaultMenuList[4].children = reactPosts

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
