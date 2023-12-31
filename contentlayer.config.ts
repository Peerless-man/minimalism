import {
	defineDocumentType,
	makeSource,
	ComputedFields,
	FieldDefs,
} from 'contentlayer/source-files'

export type Post = {
	title: string
	menuTitle?: string
	date: string
	category: string
	header: string
	show: boolean
	body: {
		raw: string
		code: string
	}
	_id: string
	_raw: {
		sourceFilePath: string
		sourceFileName: string
		sourceFileDir: string
		contentType: string
		flattenedPath: string
	}
	type: string
	url: string
	wordCount: number
}

const computedFields: ComputedFields = {
	url: {
		type: 'string',
		resolve: doc => `${doc._raw.flattenedPath}`,
	},
	wordCount: {
		type: 'number',
		resolve: doc => doc.body.raw.split(/\s+/gu).length,
	},
}

const fields: FieldDefs = {
	title: {
		type: 'string',
		description: 'The title of the Post',
		required: true,
	},
	menuTitle: {
		type: 'string',
		description: 'The title of the Menu',
		required: false,
	},
	date: {
		type: 'date',
		description: 'The date of the Post',
		required: true,
	},
	category: {
		type: 'string',
		description: 'The category of the Post',
		required: true,
	},
	header: {
		type: 'string',
		description: 'The header image of the Post',
		required: false,
	},
	show: {
		type: 'boolean',
		description: '是否展示',
		required: false,
		default: true,
	},
}

const Vue2Posts = defineDocumentType(() => ({
	name: 'Vue2Posts',
	filePathPattern: `vue2/**/*.mdx`,
	contentType: 'mdx',
	fields,
	computedFields,
}))
const Vue3Posts = defineDocumentType(() => ({
	name: 'Vue3Posts',
	filePathPattern: `vue3/**/*.mdx`,
	contentType: 'mdx',
	fields,
	computedFields,
}))

const EssayPosts = defineDocumentType(() => ({
	name: 'EssayPosts',
	filePathPattern: `essay/**/*.mdx`,
	contentType: 'mdx',
	fields,
	computedFields,
}))

const ReactPosts = defineDocumentType(() => ({
	name: 'ReactPosts',
	filePathPattern: `react/**/*.mdx`,
	contentType: 'mdx',
	fields,
	computedFields,
}))

const JavaScriptPosts = defineDocumentType(() => ({
	name: 'JavaScriptPosts',
	filePathPattern: `javaScript/**/*.mdx`,
	contentType: 'mdx',
	fields,
	computedFields,
}))

export default makeSource({
	contentDirPath: './posts',
	documentTypes: [
		Vue2Posts,
		Vue3Posts,
		EssayPosts,
		ReactPosts,
		JavaScriptPosts,
	],
})
