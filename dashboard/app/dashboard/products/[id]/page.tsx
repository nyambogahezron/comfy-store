import ProductDetails from './ProductDetails';
import productsData from '@/utils/data/products.json';

export default function Page({ params }: { params: { id: string } }) {
	return <ProductDetails params={params} />;
}

export async function generateStaticParams() {
	const products = productsData;

	return products.map((product) => ({
		id: product.id.toString(),
	}));
}
