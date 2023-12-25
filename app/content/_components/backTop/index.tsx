import { ArrowUpCircleIcon } from '@heroicons/react/24/outline'
import { useEffect, useState } from 'react'
import { debounce } from 'utils/tool'

function BackTop() {
	const [show, setShow] = useState<boolean>(false)

	const scrollTop = () => {
		window.scroll({
			top: 0,
			behavior: 'smooth',
		})
	}

	const setBackTopShow = () => {
		let offsetTop = window.scrollY || document.body.scrollTop
		if (offsetTop > 200) {
			setShow(true)
		} else {
			setShow(false)
		}
	}

	const debounceJudge = debounce(setBackTopShow, 30)

	useEffect(() => {
		debounceJudge()
		window.addEventListener('scroll', debounceJudge)

		return () => {
			window.removeEventListener('scroll', debounceJudge)
		}
	}, [])

	if (!show) {
		return
	}

	return (
		<>
			<ArrowUpCircleIcon
				className="fixed bottom-8 right-1 md:right-20 focus:outline-none w-10 h-10 dark:text-violet-100 hover:text-violet-500 dark:hover:text-violet-300 duration-300"
				aria-hidden="true"
				onClick={scrollTop}
			/>
		</>
	)
}

export default BackTop
