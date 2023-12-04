import Image from 'next/image'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export default function GitHub() {
	const { resolvedTheme } = useTheme()

	const [isDark, setIsDark] = useState<boolean>(false)

	useEffect(() => {
		if (resolvedTheme == 'dark') {
			setIsDark(true)
		} else {
			setIsDark(false)
		}
	}, [resolvedTheme])

	const goToGithub = () => {
		window.open('https://github.com/Peerless-man/minimalism')
	}

	return isDark ? (
		<Image
			alt="github"
			src="/image/githubDark.png"
			width={28}
			height={28}
			style={{ objectFit: 'cover' }}
			onClick={goToGithub}
		/>
	) : (
		<Image
			alt="github"
			src="/image/githubLight.png"
			width={28}
			height={28}
			style={{ objectFit: 'cover' }}
			onClick={goToGithub}
		/>
	)
}
