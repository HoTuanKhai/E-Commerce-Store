import Coupon from "../models/coupon.model.js";
import Order from "../models/order.model.js";
import Product from '../models/product.model.js';
import User from '../models/user.model.js';
import { stripe } from "../lib/stripe.js";

export const createCheckoutSession = async (req, res) => {
	try {
		const { products, couponCode } = req.body;

		if (!Array.isArray(products) || products.length === 0) {
			return res.status(400).json({ error: "Invalid or empty products array" });
		}

		let totalAmount = 0;

		const lineItems = products.map((product) => {
			const amount = Math.round(product.price * 100); // stripe wants u to send in the format of cents
			totalAmount += amount * product.quantity;

			return {
				price_data: {
					currency: "usd",
					product_data: {
						name: product.name,
						images: [product.image],
					},
					unit_amount: amount,
				},
				quantity: product.quantity || 1,
			};
		});

		let coupon = null;
		if (couponCode) {
			coupon = await Coupon.findOne({ code: couponCode, userId: req.user._id, isActive: true });
			if (coupon) {
				totalAmount -= Math.round((totalAmount * coupon.discountPercentage) / 100);
			}
		}

		const session = await stripe.checkout.sessions.create({
			payment_method_types: ["card"],
			line_items: lineItems,
			mode: "payment",
			success_url: `${process.env.CLIENT_URL}/purchase-success?session_id={CHECKOUT_SESSION_ID}`,
			cancel_url: `${process.env.CLIENT_URL}/purchase-cancel`,
			discounts: coupon
				? [
						{
							coupon: await createStripeCoupon(coupon.discountPercentage),
						},
				  ]
				: [],
			metadata: {
				userId: req.user._id.toString(),
				couponCode: couponCode || "",
				productIds: JSON.stringify(products.map((p) => p._id)),
			},
		});

		if (totalAmount >= 20000) {
			await createNewCoupon(req.user._id);
		}
		res.status(200).json({ id: session.id, totalAmount: totalAmount / 100 });
	} catch (error) {
		console.error("Error processing checkout:", error);
		res.status(500).json({ message: "Error processing checkout", error: error.message });
	}
};

export const checkoutSuccess = async (req, res) => {
	try {
		const { sessionId } = req.body;
		const session = await stripe.checkout.sessions.retrieve(sessionId);

		if (session.payment_status === "paid") {
			if (session.metadata.couponCode) {
				await Coupon.findOneAndUpdate(
					{
						code: session.metadata.couponCode,
						userId: session.metadata.userId,
					},
					{
						isActive: false,
					}
				);
			}

			const existingOrder = await Order.findOne({ stripeSessionId: sessionId });
			if (existingOrder) {
				console.log(`Order with stripeSessionId ${sessionId} already exists. Skipping order creation.`);
				return res.status(200).json({
					success: true,
					message: "Order already processed.",
					orderId: existingOrder._id,
				});
			}

			// create a new Order
			const productIds = JSON.parse(session.metadata.productIds);
			console.log("productIds from metadata:", productIds);

			const user = await User.findById(session.metadata.userId);
			if (!user) {
				console.error(`User with ID ${session.metadata.userId} not found.`);
				return res.status(404).json({ message: "User not found." });
			}
			console.log("User's cartItems:", user.cartItems);

			const fetchedProducts = await Product.find({ _id: { $in: productIds } });
			console.log("Fetched Products from DB:", fetchedProducts);

			const newOrder = new Order({
				user: session.metadata.userId,
				products: productIds.map((productId) => {
					const fullProduct = fetchedProducts.find(
						(fp) => fp && fp._id && fp._id.toString() === productId.toString()
					);
					const cartItem = user.cartItems.find(
						(item) => item && item._id && item._id.toString() === productId.toString()
					);
					if (!fullProduct || !cartItem) {
						console.warn(`Product with ID ${productId} or its cart item not found during order creation.`);
						return null;
					}
					return {
						product: fullProduct._id,
						quantity: cartItem.quantity,
						price: fullProduct.price,
					};
				}).filter(Boolean),
				totalAmount: session.amount_total / 100,
				stripeSessionId: sessionId,
			});

			await newOrder.save();

			await User.findByIdAndUpdate(session.metadata.userId, { $set: { cartItems: [] } });

			res.status(200).json({
				success: true,
				message: "Payment successful, order created, and coupon deactivated if used.",
				orderId: newOrder._id,
			});
		}
	} catch (error) {
		console.error("Error processing successful checkout:", error);
		res.status(500).json({ message: "Error processing successful checkout", error: error.message });
	}
};

async function createStripeCoupon(discountPercentage) {
	const coupon = await stripe.coupons.create({
		percent_off: discountPercentage,
		duration: "once",
	});

	return coupon.id;
}

async function createNewCoupon(userId) {
	await Coupon.findOneAndDelete({ userId });

	const newCoupon = new Coupon({
		code: "GIFT" + Math.random().toString(36).substring(2, 8).toUpperCase(),
		discountPercentage: 10,
		expirationDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
		userId: userId,
	});

	await newCoupon.save();

	return newCoupon;
}