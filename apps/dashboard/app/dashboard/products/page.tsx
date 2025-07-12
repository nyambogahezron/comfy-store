'use client';

import React from 'react';
import { MoreHorizontal, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Table } from '@/components/ui/table';
import { TableBody } from '@/components/ui/table';
import { TableCell } from '@/components/ui/table';
import { TableHead } from '@/components/ui/table';
import { TableHeader } from '@/components/ui/table';
import { TableRow } from '@/components/ui/table';
import { DropdownMenu } from '@/components/ui/dropdown-menu';
import { DropdownMenuContent } from '@/components/ui/dropdown-menu';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Drawer } from '@/components/ui/drawer';
import { DrawerClose } from '@/components/ui/drawer';
import { DrawerContent } from '@/components/ui/drawer';
import { DrawerFooter } from '@/components/ui/drawer';
import { DrawerTrigger } from '@/components/ui/drawer';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
	ToastProvider,
	Toast,
	ToastTitle,
	ToastDescription,
	ToastClose,
	ToastViewport,
} from '@/components/ui/toast';

import productsData from '@/utils/data/products.json';
import { useRouter } from 'next/navigation';

export default function ProductsPage() {
	const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
	const [isEditMode, setIsEditMode] = React.useState(false);
	const [selectedProduct, setSelectedProduct] = React.useState<Product | null>(
		null
	);
	const [isDeleteToastOpen, setIsDeleteToastOpen] = React.useState(false);
	const [productToDelete, setProductToDelete] = React.useState<Product | null>(
		null
	);
	const router = useRouter();

	const products: Product[] = productsData.map((product) => ({
		...product,
		description: product.description || '',
	}));

	const handleAddProduct = (e: React.FormEvent) => {
		e.preventDefault();
		// Handle form submission
		setIsDrawerOpen(false);
	};

	const handleEditProduct = (product: Product) => {
		setSelectedProduct(product);
		setIsEditMode(true);
		setIsDrawerOpen(true);
	};

	const handleDeleteProduct = (product: Product) => {
		setProductToDelete(product);
		setIsDeleteToastOpen(true);
	};

	const confirmDeleteProduct = () => {
		// Handle product deletion
		setIsDeleteToastOpen(false);
	};

	const handleRowClick = (product: Product) => {
		router.push(`/dashboard/products/${product.id}`);
	};

	interface Product {
		id: number;
		name: string;
		category: string;
		status: string;
		price: number;
		stock: number;
		image: string;
		description: string;
	}

	return (
		<ToastProvider>
			<div className='space-y-6'>
				<Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
					<div className='flex flex-row justify-between'>
						<div className='flex justify-between items-center'>
							<h1 className='text-3xl font-bold'>Products</h1>
						</div>
						<DrawerTrigger asChild>
							<Button
								onClick={() => {
									setIsEditMode(false);
									setSelectedProduct(null);
								}}
							>
								<Plus className='mr-2 h-4 w-4' /> Add Product
							</Button>
						</DrawerTrigger>
					</div>

					{/* product list  */}

					<Card>
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead>Product</TableHead>
									<TableHead>Category</TableHead>
									<TableHead>Status</TableHead>
									<TableHead>Price</TableHead>
									<TableHead>Stock</TableHead>
									<TableHead className='w-[70px]'></TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{products.map((product) => (
									<TableRow key={product.id} className='cursor-pointer'>
										<TableCell
											className='font-medium'
											onClick={() => handleRowClick(product)}
										>
											<div className='flex items-center gap-3'>
												<img
													src={product.image}
													alt={product.name}
													className='h-10 w-10 rounded-lg object-cover'
												/>
												{product.name}
											</div>
										</TableCell>
										<TableCell>{product.category}</TableCell>
										<TableCell>
											<span
												className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
													product.status === 'In Stock'
														? 'bg-green-100 text-green-700 dark:bg-green-700/20 dark:text-green-500'
														: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-700/20 dark:text-yellow-500'
												}`}
											>
												{product.status}
											</span>
										</TableCell>
										<TableCell>${product.price}</TableCell>
										<TableCell>{product.stock}</TableCell>
										<TableCell>
											<DropdownMenu>
												<DropdownMenuTrigger asChild>
													<Button
														variant='ghost'
														size='icon'
														onClick={(e) => e.stopPropagation()}
													>
														<MoreHorizontal className='h-4 w-4' />
													</Button>
												</DropdownMenuTrigger>
												<DropdownMenuContent align='end'>
													<DropdownMenuItem
														onClick={() => handleEditProduct(product)}
													>
														Edit
													</DropdownMenuItem>
													<DropdownMenuItem
														className='text-red-600'
														onClick={() => handleDeleteProduct(product)}
													>
														Delete
													</DropdownMenuItem>
												</DropdownMenuContent>
											</DropdownMenu>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</Card>

					{/* add/edit product model */}
					<DrawerContent className='h-[95vh]'>
						<div className='mx-auto w-full max-w-lg'>
							<form onSubmit={handleAddProduct} className='p-4 pb-0'>
								<div className='space-y-4'>
									<div>
										<Label htmlFor='name'>Product Name</Label>
										<Input
											id='name'
											placeholder='Enter product name'
											defaultValue={
												isEditMode && selectedProduct
													? selectedProduct.name
													: ''
											}
										/>
									</div>
									<div>
										<Label htmlFor='price'>Price</Label>
										<Input
											id='price'
											type='number'
											placeholder='99.99'
											step='0.01'
											min='0'
											defaultValue={
												isEditMode && selectedProduct
													? selectedProduct.price
													: ''
											}
										/>
									</div>
									<div>
										<Label htmlFor='stock'>Stock</Label>
										<Input
											id='stock'
											type='number'
											placeholder='100'
											min='0'
											defaultValue={
												isEditMode && selectedProduct
													? selectedProduct.stock
													: ''
											}
										/>
									</div>
									<div>
										<Label htmlFor='description'>Description</Label>
										<Textarea
											id='description'
											placeholder='Enter product description'
											className='min-h-[100px]'
											defaultValue={
												isEditMode && selectedProduct
													? selectedProduct.description
													: ''
											}
										/>
									</div>
									<div>
										<Label htmlFor='image'>Image URL</Label>
										<Input
											id='image'
											type='url'
											placeholder='https://example.com/image.jpg'
											defaultValue={
												isEditMode && selectedProduct
													? selectedProduct.image
													: ''
											}
										/>
									</div>
								</div>
							</form>
							<DrawerFooter>
								<Button type='submit' onClick={handleAddProduct}>
									{isEditMode ? 'Update Product' : 'Save Product'}
								</Button>
								<DrawerClose asChild>
									<Button variant='outline'>Cancel</Button>
								</DrawerClose>
							</DrawerFooter>
						</div>
					</DrawerContent>
				</Drawer>

				{/* delete confirmation toast */}
				<Toast open={isDeleteToastOpen} onOpenChange={setIsDeleteToastOpen}>
					<div className='flex items-center'>
						<ToastTitle>Confirm Delete</ToastTitle>
						<ToastDescription>
							Are you sure you want to delete {productToDelete?.name}?
						</ToastDescription>
					</div>
					<div className='flex space-x-2'>
						<Button
							variant='outline'
							onClick={() => setIsDeleteToastOpen(false)}
						>
							Cancel
						</Button>
						<Button variant='destructive' onClick={confirmDeleteProduct}>
							Delete
						</Button>
					</div>
					<ToastClose />
				</Toast>
				<ToastViewport />
			</div>
		</ToastProvider>
	);
}
