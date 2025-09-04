import Order from '../models/Order.model';
import AsyncHandler from '../middleware/AsyncHandler';
import { BadRequestError, NotFoundError } from '../errors';
import { Request, Response } from 'express';

/**
 * @desc    Create new order
 * @route   POST /api/orders
 * @access  Private
 */

export const CreateNewOrder = AsyncHandler(
  async (req: Request, res: Response) => {
    const {
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      shippingPrice,
      taxPrice,
      totalPrice,
    } = req.body;

    if (!orderItems || orderItems.length === 0) {
      res.status(400);
      throw new BadRequestError('No order items');
    }

    const order = new Order({
      orderItems,
      user: req.user?.userId,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      shippingPrice,
      taxPrice,
      totalPrice,
    });

    const createdOrder = await order.save();

    res.status(201).json(createdOrder);
  }
);

/**
 * @desc Get order by ID
 * @route GET /api/orders/:id
 * @access Private
 */

export const GetSingleOrder = AsyncHandler(
  async (req: Request, res: Response) => {
    const order = await Order.findById(req.params.id).populate(
      'user',
      'name email'
    );

    if (!order) {
      throw new NotFoundError('Order not found');
    }

    res.json(order);
  }
);

/**
 * @desc Update order to paid
 * @route GET /api/orders/:id/pay
 * @access Private
 */

export const UpdateOrder = AsyncHandler(async (req: Request, res: Response) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    throw new NotFoundError('Order not found');
  }

  order.isPaid = true;
  order.paidAt = new Date();

  const updatedOrder = await order.save();

  res.json(updatedOrder);
});

/**
 * @desc Get logged in user orders
 * @route GET /api/orders/my-orders
 * @access Private
 */

export const GetMyOrders = AsyncHandler(async (req: Request, res: Response) => {
  const orders = await Order.find({ user: req.user?.userId });

  res.json(orders);
});

/**
 * @desc Get all orders
 * @route GET /api/orders
 * @access Private/Admin
 */

export const GetAllOrders = AsyncHandler(
  async (req: Request, res: Response) => {
    const orders = await Order.find({}).populate('user', 'id name');

    res.json(orders);
  }
);
