export const getRandomNews = <T>(array: T[]): T[] => {
	const copiedArray = [...array]
	const result: T[] = []

	const count = Math.min(6, copiedArray.length)

	for (let i = 0; i < count; i++) {
		const randomIndex = Math.floor(Math.random() * copiedArray.length)
		result.push(copiedArray.splice(randomIndex, 1)[0])
	}

	return result
}
