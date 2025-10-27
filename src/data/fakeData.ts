export const fakeProducts = (
	strNum: string | number,
	category: string = 'any',
	subCategory: string = 'any'
) => {
	const count = Number(strNum)

	const adjectives = [
		'Awesome',
		'Elegant',
		'Modern',
		'Stylish',
		'Durable',
		'Premium',
		'Luxury',
		'Compact',
		'Wireless',
		'Smart'
	]
	const nouns = [
		'Gadget',
		'Device',
		'Tool',
		'Kit',
		'System',
		'Console',
		'Phone',
		'Watch',
		'Speaker',
		'Lamp'
	]
	const features = [
		'long-lasting battery',
		'eco-friendly design',
		'high precision',
		'easy to use',
		'Bluetooth connectivity',
		'voice control',
		'LED display',
		'portable charging',
		'ultra-fast performance',
		'sleek look'
	]
	const verbs = [
		'enhance',
		'improve',
		'boost',
		'simplify',
		'transform',
		'revolutionize',
		'optimize'
	]
	const targets = ['your experience', 'your lifestyle', 'your productivity', 'your comfort']

	const getRandomWord = (list: string[]) => list[Math.floor(Math.random() * list.length)]

	const getRandomPhrase = (wordCount: number) =>
		Array.from({ length: wordCount }, () => getRandomWord([...adjectives, ...nouns])).join(' ')

	const getRandomDescription = () => {
		const parts = [
			`This ${getRandomWord(nouns)} is ${getRandomWord(adjectives)}.`,
			`It features ${getRandomWord(features)}.`,
			`Designed to ${getRandomWord(verbs)} ${getRandomWord(targets)}.`,
			`Perfect for anyone looking for quality and innovation.`,
			`Combines style, durability, and functionality in one package.`
		]
		return parts.slice(0, Math.floor(Math.random() * 3) + 2).join(' ')
	}

	const getRandomId = () => Math.floor(100000 + Math.random() * 900000)
	const getRandomPrice = () => parseFloat((Math.random() * (90000 - 10) + 10).toFixed(2))

	return Array.from({ length: count }, () => ({
		id: getRandomId(),
		name: getRandomPhrase(8),
		description: getRandomDescription(),
		price: getRandomPrice(),
		category,
		subCategory
	}))
}
