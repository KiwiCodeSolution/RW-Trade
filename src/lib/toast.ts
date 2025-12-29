import Toastify from 'toastify-js'
import 'toastify-js/src/toastify.css'

export const toast = {
	success: (msg: string) =>
		Toastify({
			text: msg,
			duration: 3000,
			gravity: 'top',
			position: 'right',
			style: {
				background: 'linear-gradient(to right, var(--color-gr-1), var(--color-gr-2))',
				color: 'var(--color-txt-white)'
			}
		}).showToast(),

	error: (msg: string) =>
		Toastify({
			text: msg,
			duration: 4000,
			gravity: 'top',
			position: 'right',
			style: {
				background: 'linear-gradient(to right, var(--color-gr-7), var(--color-sc-5))',
				color: 'var(--color-txt-white)'
			}
		}).showToast(),

	info: (msg: string) =>
		Toastify({
			text: msg,
			duration: 3000,
			gravity: 'top',
			position: 'right',
			style: {
				background: 'linear-gradient(to right, var(--color-gr-5), var(--color-gr-6))',
				color: 'var(--color-txt-dark)'
			}
		}).showToast()
}
