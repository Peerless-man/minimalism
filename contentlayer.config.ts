import {
	defineDocumentType,
	makeSource,
	ComputedFields,
} from 'contentlayer/source-files'

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

const Vue2Posts = defineDocumentType(() => ({
	name: 'Vue2Posts',
	filePathPattern: `vue2/**/*.mdx`,
	contentType: 'mdx',
	fields: {
		title: {
			type: 'string',
			description: 'The title of the vuePost',
			required: true,
		},
		date: {
			type: 'date',
			description: 'The date of the vuePost',
			required: true,
		},
		category: {
			type: 'string',
			description: 'The category of the vuePost',
			required: true,
		},
	},
	computedFields,
}))
const Vue3Posts = defineDocumentType(() => ({
	name: 'Vue3Posts',
	filePathPattern: `vue3/**/*.mdx`,
	contentType: 'mdx',
	fields: {
		title: {
			type: 'string',
			description: 'The title of the vuePost',
			required: true,
		},
		date: {
			type: 'date',
			description: 'The date of the vuePost',
			required: true,
		},
		category: {
			type: 'string',
			description: 'The category of the vuePost',
			required: true,
		},
	},
	computedFields,
}))

const EssayPosts = defineDocumentType(() => ({
	name: 'EssayPosts',
	filePathPattern: `essay/**/*.mdx`,
	contentType: 'mdx',
	fields: {
		title: {
			type: 'string',
			description: 'The title of the diaryPost',
			required: true,
		},
		date: {
			type: 'date',
			description: 'The date of the diaryPost',
			required: true,
		},
		category: {
			type: 'string',
			description: 'The category of the diaryPost',
			required: true,
		},
	},
	computedFields,
}))

const ReactPosts = defineDocumentType(() => ({
	name: 'ReactPosts',
	filePathPattern: `react/**/*.mdx`,
	contentType: 'mdx',
	fields: {
		title: {
			type: 'string',
			description: 'The title of the reactPost',
			required: true,
		},
		date: {
			type: 'date',
			description: 'The date of the reactPost',
			required: true,
		},
		category: {
			type: 'string',
			description: 'The category of the reactPost',
			required: true,
		},
	},
	computedFields,
}))

export default makeSource({
	contentDirPath: './posts',
	documentTypes: [Vue2Posts, Vue3Posts, EssayPosts, ReactPosts],
})
