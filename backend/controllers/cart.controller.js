import Product from "../models/product.model.js";

export const getCartProducts = async (req, res) => {
    try {

        const productIds = req.user.cartItems.map(item => item.id);

        const products = await Product.find({ _id: { $in: productIds } });

        // add quantity for each product

        const cartItemsWithQuantity = products.map(product => {
            const cartItemDetail = req.user.cartItems.find(
                // So sánh ID Mongoose (toString()) với ID chuỗi
                item => item.id.toString() === product._id.toString() 
            );
            
            // Nếu tìm thấy, thêm quantity vào đối tượng sản phẩm
            return { 
                ...product.toJSON(), 
                quantity: cartItemDetail ? cartItemDetail.quantity : 1 
            };
        });

        res.json({ data: cartItemsWithQuantity, success: true })
    } catch (error) {
        console.log("Error in getCartProducts controller", error.message);
        res.status(500).json({ success: false, message: "Server error", error: error.message});
    }
}

export const addToCart = async (req, res) =>{
    try {
        const {productId} = req.body;
        const user = req.user;

        user.cartItems = user.cartItems || [];

        const existingItem = user.cartItems.find(item => item.id.toString() === productId.toString());
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            // 2. THÊM MỚI SẢN PHẨM DƯỚI DẠNG ĐỐI TƯỢNG {id, quantity: 1}
            user.cartItems.push({ id: productId, quantity: 1 });
        }

        await user.save();
        res.json({ data: user.cartItems, success: true })
    } catch (error) {
        console.log("Error in addToCart controller", error.message);
        res.status(500).json({ success: false, message: "Server error", error: error.message});
    }
};

export const removeAllFromCart = async (req, res) => {
    try {
        const { productId } = req.body;
        const user = req.user;
        if (!productId) {
            user.cartItems = [];
        }else{
            user.cartItems = user.cartItems.filter((item) => item.id.toString() !== productId.toString());
        }
        await user.save();
        res.json({ data: user.cartItems, success: true });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error", error: error.message});
    }
};

export const updateQuantity = async (req, res) => {
    try {
        const { id: productId} = req.params;
        const { quantity } = req.body;
        const user = req.user;
        const existingItem = user.cartItems.find((item) => item.id.toString() === productId.toString());

        if (existingItem) {
            if (quantity === 0) {
                user.cartItems = user.cartItems.filter((item) => item.id.toString() !== productId.toString());
                await user.save();
                return res.json({ data: user.cartItems, success: true });
            }

            existingItem.quantity = quantity;
            await user.save();
            res.json({ data: user.cartItems, success: true });
        } else{
            res.status(404).json({ success: false, message: "Product not found"});
        }
    } catch (error) {
        console.log("Error in updateQuantity controller", error.message);
        res.status(500).json({ success: false, message: "Server error", error: error.message});
    }
};