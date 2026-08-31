export function getYouTubeEmbedUrl(url: string): string | null {
	if (!url) return null

	// Витягуємо ID з різних типів лінок
	const match =
		url.match(/(?:v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/) ||
		url.match(/embed\/([a-zA-Z0-9_-]{11})/)

	if (!match) return null
	const videoId = match[1]

	return `https://www.youtube.com/embed/${videoId}`
}
