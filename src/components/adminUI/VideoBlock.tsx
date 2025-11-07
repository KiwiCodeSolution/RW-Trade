import { getYouTubeEmbedUrl } from '@/helpers/getYouTubeEmbedUrl'

import { Product } from '@/types/baseTypes'

const VideoBlock = ({ videoUrl }: { videoUrl: Product['videoUrl'] }) => {
	if (!videoUrl) return null

	const embedUrl = getYouTubeEmbedUrl(videoUrl)
	if (!embedUrl) return null

	return (
		<div className='aspect-video w-full max-w-[862px] mx-auto rounded-xl overflow-hidden'>
			<iframe
				src={embedUrl}
				title='Video'
				allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
				allowFullScreen
				className='w-full h-full'
			/>
		</div>
	)
}
export default VideoBlock
