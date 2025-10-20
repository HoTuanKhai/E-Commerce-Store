import express from 'express';
  import { getAllUsers, deleteUser, updateUserRole } from '../controllers/user.controller.js';
  import { protectRoute, adminRoute } from '../middleware/auth.middleware.js';

  const router = express.Router();

  // Tất cả các route trong file này đều được bảo vệ và chỉ dành cho admin
  router.use(protectRoute, adminRoute);

  router.route('/').get(getAllUsers);
  router.route('/:id').delete(deleteUser);
  router.patch('/:id/role', updateUserRole);

  export default router;