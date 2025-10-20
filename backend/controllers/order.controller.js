import Order from '../models/order.model.js';

  // @desc    Get all orders
  // @route   GET /api/orders
  // @access  Private/Admin
  export const getAllOrders = async (req, res) => {
      try {
          const orders = await Order.find({})
              .sort({ createdAt: -1 }) // Sắp xếp theo đơn hàng mới nhất
              .populate("user", "name email"); // Lấy thêm thông tin name và email của user

          res.json(orders);
      } catch (error) {
          console.log("Error in getAllOrders controller", error.message);
          res.status(500).json({ message: "Server error" });
      }
  };