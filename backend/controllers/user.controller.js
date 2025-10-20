import User from '../models/user.model.js';

  // @desc    Get all users
  // @route   GET /api/users
  // @access  Private/Admin
  export const getAllUsers = async (req, res) => {
      try {
          // Tìm tất cả user nhưng không bao gồm trường password
          const users = await User.find({}).select('-password');
          res.json(users);
      } catch (error) {
          console.log("Error in getAllUsers controller", error.message);
          res.status(500).json({ message: "Server error" });
      }
  };

  // @desc    Delete a user
  // @route   DELETE /api/users/:id
  // @access  Private/Admin
  export const deleteUser = async (req, res) => {
      try {
          const user = await User.findById(req.params.id);

          if (user) {
              // Ngăn không cho admin tự xóa chính mình
              if (user.role === 'admin') {
                  return res.status(400).json({ message: 'Cannot delete admin user' });
              }
              await User.findByIdAndDelete(req.params.id);
              res.json({ message: 'User removed' });
          } else {
              res.status(404).json({ message: 'User not found' });
          }
      } catch (error) {
          console.log("Error in deleteUser controller", error.message);
          res.status(500).json({ message: "Server error" });
      }
  };

  export const updateUserRole = async (req, res) => {
      try {
          const { id } = req.params;
          const { role } = req.body;

          if (!role || !['admin', 'customer'].includes(role)) {
              return res.status(400).json({ message: 'Invalid role specified' });
          }

          const user = await User.findById(id);

          if (!user) {
              return res.status(404).json({ message: 'User not found' });
          }

          // Ngăn admin tự thay đổi vai trò của chính mình
          if (req.user._id.equals(user._id) && user.role === 'admin' && role !== 'admin') {
              return res.status(400).json({ message: 'Admins cannot change their own role' });
          }

          user.role = role;
          await user.save();

          const userResponse = user.toObject();
          delete userResponse.password;

          res.json(userResponse);
      } catch (error) {
          console.log("Error in updateUserRole controller", error.message);
          res.status(500).json({ message: "Server error" });
      }
  };