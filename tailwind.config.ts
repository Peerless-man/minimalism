import type { Config } from 'tailwindcss'

const config: Config = {
	darkMode: 'class',
	content: [
		'./pages/**/*.{ts,tsx}',
		'./components/**/*.{ts,tsx}',
		'./app/**/*.{ts,tsx}',
		'./src/**/*.{ts,tsx}',
	],

	theme: {
		screens: {
			sm: '414px',
			md: '768px',
			lg: '976px',
			xl: '1280px',
			'2xl': '1440px',
		},
		extend: {
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-conic':
					'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
			},
		},
	},
	plugins: [
		require('@headlessui/tailwindcss'),
		// Or with a custom prefix:
		require('@headlessui/tailwindcss')({ prefix: 'ui' }),
	],
}
export default config
