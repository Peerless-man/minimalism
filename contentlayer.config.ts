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

const VuePosts = defineDocumentType(() => ({
	name: 'VuePosts',
	filePathPattern: `vue/**/*.mdx`,
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

const DiaryPosts = defineDocumentType(() => ({
	name: 'DiaryPosts',
	filePathPattern: `diary/**/*.mdx`,
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
	documentTypes: [VuePosts, DiaryPosts, ReactPosts],
})
