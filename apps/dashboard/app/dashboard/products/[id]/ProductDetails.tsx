'use client';

import { useState } from 'react';
import { Star, ChevronLeft, ShoppingCart, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Link from 'next/link';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import productsData from '@/utils/data/products.json';
import reviews from '@/utils/data/reviews.json';

interface Review {
	id: number;
	user: string;
	rating: number;
	date: string;
	comment: string;
	avatar: string;
}

export default function ProductDetails({ params }: { params: { id: string } }) {
	const [quantity, setQuantity] = useState(1);

	const product = productsData.find((p) => p.id === parseInt(params.id));

	if (!product) {
		return <div>Product not found</div>;
	}

	const renderStars = (rating: number) => {
		return [...Array(5)].map((_, index) => (
			<Star
				key={index}
				className={`h-4 w-4 ${
					index < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
				}`}
			/>
		));
	};

	return (
		<div className='min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8'>
			<div className='max-w-7xl mx-auto'>
				<Link
					href='/dashboard'
					className='inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 mb-8'
				>
					<ChevronLeft className='h-4 w-4 mr-1' />
					Back to Dashboard
				</Link>

				<div className='grid grid-cols-1 lg:grid-cols-2 gap-12'>
					{/* Product Images */}
					<div className='space-y-4'>
						<div className='aspect-square overflow-hidden rounded-lg bg-gray-100'>
							<img
								src={product.image}
								alt={product.name}
								className='h-full w-full object-cover object-center'
							/>
						</div>
					</div>

					{/* Product Info */}
					<div>
						<h1 className='text-3xl font-bold text-gray-900'>{product.name}</h1>
						<div className='mt-4 flex items-center'>
							<div className='flex items-center'>
								{renderStars(Math.floor(product.rating))}
								<span className='ml-2 text-sm text-gray-500'>
									{product.rating} ({product.reviewCount} reviews)
								</span>
							</div>
						</div>

						<p className='mt-4 text-4xl font-bold text-gray-900'>
							${product.price.toFixed(2)}
						</p>

						<Tabs defaultValue='description' className='mt-8'>
							<TabsList>
								<TabsTrigger value='description'>Description</TabsTrigger>
								<TabsTrigger value='features'>Features</TabsTrigger>
								<TabsTrigger value='reviews'>Reviews</TabsTrigger>
							</TabsList>
							<TabsContent value='description' className='mt-4'>
								<p className='text-gray-600'>{product.description}</p>
							</TabsContent>
							<TabsContent value='features' className='mt-4'>
								<ul className='list-disc list-inside space-y-2'>
									{product.features.map((feature, index) => (
										<li key={index} className='text-gray-600'>
											{feature}
										</li>
									))}
								</ul>
							</TabsContent>
							<TabsContent value='reviews' className='mt-4'>
								<div className='space-y-6'>
									{reviews.map((review) => (
										<Card key={review.id} className='p-6'>
											<div className='flex items-start'>
												<img
													src={review.avatar}
													alt={review.user}
													className='h-10 w-10 rounded-full object-cover'
												/>
												<div className='ml-4'>
													<div className='flex items-center'>
														<h4 className='font-medium text-gray-900'>
															{review.user}
														</h4>
														<span className='mx-2 text-gray-300'>•</span>
														<time className='text-sm text-gray-500'>
															{new Date(review.date).toLocaleDateString()}
														</time>
													</div>
													<div className='mt-1 flex items-center'>
														{renderStars(review.rating)}
													</div>
													<p className='mt-2 text-gray-600'>{review.comment}</p>
												</div>
											</div>
										</Card>
									))}
								</div>
							</TabsContent>
						</Tabs>

						<div className='mt-8 space-y-4'>
							<div className='flex items-center space-x-4'>
								<Button
									onClick={() => setQuantity(Math.max(1, quantity - 1))}
									variant='outline'
									size='icon'
								>
									-
								</Button>
								<span className='text-lg font-medium'>{quantity}</span>
								<Button
									onClick={() =>
										setQuantity(Math.min(product.stock, quantity + 1))
									}
									variant='outline'
									size='icon'
								>
									+
								</Button>
							</div>

							<div className='flex gap-4'>
								<Button className='flex-1'>
									<ShoppingCart className='mr-2 h-4 w-4' />
									Add to Cart
								</Button>
								<Button variant='outline' size='icon'>
									<Heart className='h-4 w-4' />
								</Button>
							</div>

							<p className='text-sm text-gray-500'>
								{product.stock} items in stock
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
