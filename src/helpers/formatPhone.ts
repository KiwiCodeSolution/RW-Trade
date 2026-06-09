// +380994445833 → +38 (099) 444-58-33
export function formatPhone(phone: string): string {
	const digits = phone.replace(/\D/g, '')

	// 380XXXXXXXXX — 12 цифр
	if (digits.startsWith('380') && digits.length === 12) {
		const code = digits.slice(2, 5) // 099
		const part1 = digits.slice(5, 8) // 444
		const part2 = digits.slice(8, 10) // 58
		const part3 = digits.slice(10, 12) // 33
		return `+38 (${code}) ${part1}-${part2}-${part3}`
	}

	// 0XXXXXXXXX — 10 цифр
	if (digits.startsWith('0') && digits.length === 10) {
		const code = digits.slice(0, 3) // 099
		const part1 = digits.slice(3, 6) // 444
		const part2 = digits.slice(6, 8) // 58
		const part3 = digits.slice(8, 10) // 33
		return `+38 (${code}) ${part1}-${part2}-${part3}`
	}

	return phone
}
