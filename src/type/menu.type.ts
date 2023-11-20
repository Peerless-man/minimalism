export type Menu = Array<MenuItem>

export type MenuItem = {
	id?: string | number
	title: string
	path?: string | undefined
	children?: Array<MenuItem>
}
