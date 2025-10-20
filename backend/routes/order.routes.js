import express from 'express';
  import { getAllOrders } from '../controllers/order.controller.js';
  import { protectRoute, adminRoute } from '../middleware/auth.middleware.js';

  const router = express.Router();

  // Route này được bảo vệ và chỉ dành cho admin
  router.get('/', protectRoute, adminRoute, getAllOrders);

  export default router;