export const fakeProducts = (strNum, category = 'any', subCategory = 'any') => {
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

	const getRandomWord = list => list[Math.floor(Math.random() * list.length)]

	const getRandomPhrase = wordCount =>
		Array.from({ length: wordCount }, () => getRandomWord([...adjectives, ...nouns])).join(' ')

	const getRandomDescription = () => {
		const parts = [
			`This ${getRandomWord(nouns)} is ${getRandomWord(adjectives)}.`,
			`It features ${getRandomWord(features)}.`,
			`Designed to ${getRandomWord(verbs)} ${getRandomWord(targets)}.`,
			`Perfect for anyone looking for quality and innovation.`,
			`Combines style, durability, and functionality in one package.`
		]
		return parts.slice(0, Math.floor(Math.random() * 3) + 2).join(' ') // Combine 2-4 parts for longer text
	}

	const getRandomId = () => Math.floor(100000 + Math.random() * 900000) // 6-digit number

	const getRandomPrice = () => parseFloat((Math.random() * (90000 - 10) + 10).toFixed(2)) // Random price between 10 and 90000

	return Array.from({ length: count }, () => ({
		id: getRandomId(),
		name: getRandomPhrase(8),
		description: getRandomDescription(),
		price: getRandomPrice(),
		category: category,
		subCategory: subCategory
	}))
}
