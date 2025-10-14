const Product = async ({ params }: { params: Promise<{ slug: string }> }) => {
	const { slug } = await params
	return <div>Product Page {slug}</div>
}

export default Product
