import Image from 'next/image'
import { useTheme } from 'next-themes'

export default function GitHub() {
	const { resolvedTheme } = useTheme()

	const goToGithub = () => {
		window.open('https://github.com/Peerless-man/minimalism')
	}

	return resolvedTheme == 'dark' ? (
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
