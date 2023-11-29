import { useDark } from 'hooks/use-dark'
import Image from 'next/image'

export default function GitHub() {
	const { isDark } = useDark()

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
