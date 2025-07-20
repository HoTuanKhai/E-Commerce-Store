import express from "express";
import { toggleFeaturedProduct, getProductsByCategory, getRecommendedProducts, deleteProduct, createProduct, getAllProducts, getFeaturedProducts } from "../controllers/product.controller.js";
import { adminRoute, protectRoutes } from "../middleware/auth.middleware.js";

const router = express.Router();


router.get("/", protectRoutes, adminRoute, getAllProducts);
router.get("/featured", getFeaturedProducts);
router.get("/category/:category", getProductsByCategory);
router.get("/recommendations", getRecommendedProducts);
router.post("/", protectRoutes, adminRoute, createProduct);
router.patch("/:id", protectRoutes, adminRoute, toggleFeaturedProduct);
router.delete("/:id", protectRoutes, adminRoute, deleteProduct);

export default router;