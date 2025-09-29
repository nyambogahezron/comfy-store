export const getFurnitureById = (id: number) => {
	const furniture = furnitureStore.furniture.flatMap(
		(category) => category.items
	);
	return furniture.find((item) => item.id === id);
};

export const furnitureStore = {
	name: 'IKEA Furniture',
	rating: '4.5 Excellent',
	ratings: '(500+)',
	img: require('@/assets/data/r1.jpeg'),
	distance: '0.85 miles away',
	delivery: '2-5 days',
	tags: [
		'Modern',
		'Affordable',
		'Scandinavian',
		'Assembly',
		'Home Decor',
		'Storage',
		'Minimalist',
	],
	about:
		'The home of modern, functional furniture and home accessories. From cozy sofas to stylish dining tables, we offer quality furniture that fits your lifestyle and budget. Assembly service available.',
	furniture: [
		{
			category: 'Living Room Bundles',
			items: [
				{
					id: 1,
					name: 'Modern Living Set 🛋️',
					price: 899,
					info: 'Includes one 3-seater sofa, coffee table, and side table. Perfect starter set for your living room.',
					img: require('@/assets/data/1.png'),
					dimensions: '84" W x 36" D x 32" H',
					material: 'Fabric upholstery, Oak wood',
					color: 'Charcoal Gray',
				},
				{
					id: 2,
					name: 'Comfort Zone Bundle 💚',
					price: 1299,
					info: 'Includes sectional sofa, ottoman, floor lamp, and decorative pillows. Everything for ultimate relaxation.',
					img: require('@/assets/data/2.png'),
					dimensions: '108" W x 75" D x 35" H',
					material: 'Memory foam, Microfiber',
					color: 'Navy Blue',
				},
				{
					id: 3,
					name: 'Entertainment Center 💕',
					price: 799,
					info: 'Includes TV stand, bookshelf, and accent chair. Perfect for your entertainment area.',
					img: require('@/assets/data/3.png'),
					dimensions: '72" W x 16" D x 24" H',
					material: 'Engineered wood, Metal',
					color: 'Walnut',
				},
				{
					id: 4,
					name: 'Complete Living Suite 😎',
					price: 1899,
					info: 'Includes sectional sofa, dining table for 6, coffee table, TV stand, and accent lighting.',
					img: require('@/assets/data/4.png'),
					dimensions: 'Various pieces',
					material: 'Mixed materials',
					color: 'Contemporary Mix',
				},
			],
		},
		{
			category: 'Chairs',
			items: [
				{
					id: 5,
					name: 'Executive Office Chair',
					price: 299,
					info: 'Ergonomic design with lumbar support, adjustable height, and premium leather finish.',
					img: require('@/assets/data/5.png'),
					dimensions: '26" W x 28" D x 42-46" H',
					material: 'Genuine leather, Steel frame',
					color: 'Black',
				},
				{
					id: 6,
					name: 'Dining Chair Set (4)',
					price: 399,
					info: 'Set of 4 upholstered dining chairs with curved backs and solid wood legs.',
					img: require('@/assets/data/6.png'),
					dimensions: '18" W x 20" D x 32" H each',
					material: 'Fabric, Solid oak',
					color: 'Light Gray',
				},
			],
		},
		{
			category: 'Tables',
			items: [
				{
					id: 7,
					name: 'Dining Table',
					price: 699,
					info: 'Extendable dining table seats 6-8 people, perfect for family gatherings.',
					img: require('@/assets/data/7.png'),
					dimensions: '72-96" L x 36" W x 30" H',
					material: 'Solid wood, Steel legs',
					color: 'Natural Oak',
				},
				{
					id: 8,
					name: 'Coffee Table',
					price: 249,
					info: 'Modern glass-top coffee table with storage shelf, perfect for small spaces.',
					img: require('@/assets/data/8.png'),
					dimensions: '48" L x 24" W x 18" H',
					material: 'Tempered glass, Chrome',
					color: 'Clear/Silver',
				},
			],
		},
		{
			category: 'Storage',
			items: [
				{
					id: 9,
					name: 'Modular Bookshelf',
					price: 189,
					info: 'Versatile 5-shelf bookcase perfect for books, decor, and storage bins. Easy assembly.',
					img: require('@/assets/data/9.png'),
					dimensions: '31" W x 12" D x 71" H',
					material: 'Engineered wood',
					color: 'White',
				},
				{
					id: 10,
					name: 'Storage Ottoman',
					price: 149,
					info: 'Upholstered storage ottoman doubles as seating and hidden storage solution.',
					img: require('@/assets/data/10.png'),
					dimensions: '30" W x 18" D x 18" H',
					material: 'Fabric, MDF frame',
					color: 'Beige',
				},
			],
		},
	],
};
