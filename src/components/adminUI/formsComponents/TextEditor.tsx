'use client'

import { Editor } from '@tinymce/tinymce-react'

import { Control, Controller, FieldValues, Path } from 'react-hook-form'

interface TextEditorProps<T extends FieldValues> {
	name: Path<T>
	control: Control<T>
	label?: string
	initialValue?: string
	rules?: Record<string, unknown>
}

const TextEditor = <T extends FieldValues>({
	name,
	control,
	label,
	initialValue,
	rules
}: TextEditorProps<T>) => {
	return (
		<div className='flex flex-col gap-1 w-full'>
			{label && <label className='font-semibold mb-1'>{label}</label>}

			<Controller
				name={name}
				control={control}
				defaultValue={initialValue as unknown as T[typeof name]}
				rules={rules}
				render={({ field: { onChange, value }, fieldState }) => (
					<>
						<Editor
							apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY}
							value={value}
							onEditorChange={onChange}
							init={{
								height: 300,
								menubar: false,
								plugins:
									'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount',
								toolbar:
									'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat',
								content_style:
									'body { font-family:Inter,Arial,sans-serif; font-size:16px; line-height:1.4; }'
							}}
						/>
						{fieldState.error && (
							<p className='text-sc-5 italic text-sm mt-1'>
								{fieldState.error.message}
							</p>
						)}
					</>
				)}
			/>
		</div>
	)
}

export default TextEditor
