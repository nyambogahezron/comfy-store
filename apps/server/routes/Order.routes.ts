import { Router } from "express";

import {
	CreateNewOrder,
	GetAllOrders,
	GetMyOrders,
	GetSingleOrder,
	UpdateOrder,
} from "../controllers/Order.controller";
import authenticate from "../middleware/Authenticate";

const router = Router();

router.route("/").post(authenticate, CreateNewOrder).get(authenticate, GetAllOrders);

router.route("/my-orders").get(authenticate, GetMyOrders);

router.route("/:id").get(authenticate, GetSingleOrder);

router.route("/:id/pay").put(authenticate, UpdateOrder);

export default router;
