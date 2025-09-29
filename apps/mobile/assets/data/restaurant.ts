export const getDishById = (id: number) => {
	const furniture = restaurant.food.flatMap((category) => category.meals);
	return furniture.find((item) => item.id === id);
};

export const restaurant = {
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
	food: [
		{
			category: 'Living Room Bundles',
			meals: [
				{
					id: 1,
					name: 'Modern Living Set 🛋️',
					price: 899,
					info: 'Includes one 3-seater sofa, coffee table, and side table. Perfect starter set for your living room.',
					img: require('@/assets/data/1.png'),
				},
				{
					id: 2,
					name: 'Comfort Zone Bundle 💚',
					price: 1299,
					info: 'Includes sectional sofa, ottoman, floor lamp, and decorative pillows. Everything for ultimate relaxation.',
					img: require('@/assets/data/2.png'),
				},
				{
					id: 3,
					name: 'Entertainment Center 💕',
					price: 799,
					info: 'Includes TV stand, bookshelf, and accent chair. Perfect for your entertainment area.',
					img: require('@/assets/data/3.png'),
				},
				{
					id: 4,
					name: 'Complete Living Suite 😎',
					price: 1899,
					info: 'Includes sectional sofa, dining table for 6, coffee table, TV stand, and accent lighting.',
					img: require('@/assets/data/4.png'),
				},
			],
		},
		{
			category: 'Chairs',
			meals: [
				{
					id: 5,
					name: 'Executive Office Chair',
					price: 299,
					info: 'Ergonomic design with lumbar support, adjustable height, and premium leather finish.',
					img: require('@/assets/data/5.png'),
				},
				{
					id: 6,
					name: 'Dining Chair Set (4)',
					price: 399,
					info: 'Set of 4 upholstered dining chairs with curved backs and solid wood legs.',
					img: require('@/assets/data/6.png'),
				},
			],
		},
		{
			category: 'Tables',
			meals: [
				{
					id: 7,
					name: 'Dining Table',
					price: 699,
					info: 'Extendable dining table seats 6-8 people, perfect for family gatherings.',
					img: require('@/assets/data/7.png'),
				},
				{
					id: 8,
					name: 'Coffee Table',
					price: 249,
					info: 'Modern glass-top coffee table with storage shelf, perfect for small spaces.',
					img: require('@/assets/data/8.png'),
				},
			],
		},
		{
			category: 'Storage',
			meals: [
				{
					id: 9,
					name: 'Modular Bookshelf',
					price: 189,
					info: 'Versatile 5-shelf bookcase perfect for books, decor, and storage bins. Easy assembly.',
					img: require('@/assets/data/9.png'),
				},
				{
					id: 10,
					name: 'Storage Ottoman',
					price: 149,
					info: 'Upholstered storage ottoman doubles as seating and hidden storage solution.',
					img: require('@/assets/data/10.png'),
				},
			],
		},
	],
};
