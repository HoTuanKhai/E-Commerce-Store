import express from "express";
import { getCartProducts, addToCart, removeAllFromCart, updateQuantity } from "../controllers/cart.controller.js";
import { protectRoutes } from "../middleware/auth.middleware";

const router = express.Router();

router.get("/", protectRoutes, getCartProducts);
router.post("/", protectRoutes, addToCart);
router.delete("/", protectRoutes, removeAllFromCart);
router.put("/:id", protectRoutes, updateQuantity); // update quantity

export default router