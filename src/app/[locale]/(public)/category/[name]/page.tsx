const Category = async ({ params }: { params: Promise<{ name: string }> }) => {
	const { name } = await params

	return <div>Category Page {name}</div>
}

export default Category
