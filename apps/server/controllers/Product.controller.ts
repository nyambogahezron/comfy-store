import type { Request, Response } from "express";
import { BadRequestError, NotFoundError } from "../errors";
import AsyncHandler from "../middleware/AsyncHandler";
import Product from "../models/Product.model";

/**
 * @desc Get All Products
 * @route GET /api/v1/products
 * @access Public
 */

export const getAllProducts = AsyncHandler(async (_req: Request, res: Response) => {
	const products = await Product.find();

	res.status(200).json({ success: true, data: products });
});

/**
 * @desc Get Single Product
 * @route GET /api/v1/products/:id
 * @access Public
 * @param id
 */

export const getSingleProduct = AsyncHandler(async (req: Request, res: Response) => {
	const product = await Product.findById(req.params.id);

	if (!product) {
		throw new NotFoundError("Product not found");
	}

	res.status(200).json({ success: true, data: product });
});

/**
 * @desc Create Product
 * @route POST /api/v1/products
 * @access Private
 */

export const createProduct = AsyncHandler(async (req: Request, res: Response) => {
	const { name, description, price, stock, category, image, color } = req.body;

	if (!name || !description || !price || !stock || !category || !image) {
		throw new BadRequestError("Please fill all fields");
	}

	const product = await Product.create({
		user: req.user?.userId,
		name,
		description,
		price,
		stock,
		category,
		image,
		color,
	});

	await product.save();

	res.status(201).json({ success: true, data: product });
});

/**
 * @desc Update Product
 * @route PUT /api/v1/products/:id
 * @access Private
 */

export const updateProduct = AsyncHandler(async (req: Request, res: Response) => {
	const { name, description, price, stock, category, image, color } = req.body;

	const product = await Product.findById(req.params.id);

	if (!product) {
		throw new NotFoundError("Product not found");
	}

	if (product.user !== req.user?.userId) {
		throw new BadRequestError("You are not authorized to update this product");
	}

	product.name = name || product.name;
	product.description = description || product.description;
	product.price = price || product.price;
	product.stock = stock || product.stock;
	product.category = category || product.category;
	product.image = image || product.image;
	product.color = color || product.color;

	await product.save();

	res.status(200).json({ success: true, data: product });
});

/**
 * @desc Delete Product
 * @route DELETE /api/v1/products/:id
 * @access Private
 */

export const deleteProduct = AsyncHandler(async (req: Request, res: Response) => {
	const product = await Product.findById(req.params.id);

	if (!product) {
		throw new NotFoundError("Product not found");
	}

	if (product.user !== req.user?.userId) {
		throw new BadRequestError("You are not authorized to delete this product");
	}

	await product.deleteOne();

	res.status(200).json({ success: true, data: {} });
});
