import { Router } from "express";
import { createProduct, getAllProducts, getSingleProduct } from "../controllers/Product.controller";

import authenticate from "../middleware/Authenticate";

const router = Router();

router.get("/", getAllProducts);
router.get("/:id", getSingleProduct);
router.post("/", authenticate, createProduct);

export default router;
