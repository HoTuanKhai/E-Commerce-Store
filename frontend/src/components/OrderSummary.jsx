import { motion } from "framer-motion";
import { useCartStore } from "../stores/useCartStore";
import { Link } from "react-router-dom";
import { MoveRight, X } from "lucide-react";
import { loadStripe } from "@stripe/stripe-js";
import axios from "../lib/axios";

const stripePromise = loadStripe(
	"pk_test_51Ro4EZQsMrBGszUxRSBroFDuJMWinBKcWen6HuV7ODAsU4L83u01ZFTbX2uGid1aKr7z1IX5hKfQDqDFzOqMn3ZQ00kg8VtJB3"
);

const OrderSummary = () => {
	const { total, subtotal, coupon, isCouponApplied, cart } = useCartStore();

	const savings = subtotal - total;
	const formattedSubtotal = subtotal.toFixed(2);
	const formattedTotal = total.toFixed(2);
	const formattedSavings = savings.toFixed(2);

	const handlePayment = async () => {
		const stripe = await stripePromise;
		const res = await axios.post("/payments/create-checkout-session", {
			products: cart,
			couponCode: coupon ? coupon.code : null,
		});

		const session = res.data;
		const result = await stripe.redirectToCheckout({
			sessionId: session.id,
		});

		if (result.error) {
			console.error("Error:", result.error);
		}
	};

	return (
		<motion.div
			className='space-y-4 rounded-lg border border-gray-700 bg-gray-800 p-4 shadow-sm sm:p-6'
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
		>
			<p className='text-xl font-semibold text-emerald-400'>Order summary</p>

			<div className='space-y-4'>
				<div className='space-y-2'>
					<dl className='flex items-center justify-between gap-4'>
						<dt className='text-base font-normal text-gray-300'>Original price</dt>
						<dd className='text-base font-medium text-white'>${formattedSubtotal}</dd>
					</dl>

					{savings > 0 && (
						<dl className='flex items-center justify-between gap-4'>
							<dt className='text-base font-normal text-gray-300'>Savings</dt>
							<dd className='text-base font-medium text-emerald-400'>-${formattedSavings}</dd>
						</dl>
					)}

					{coupon && isCouponApplied && (
						<dl className='flex items-center justify-between gap-4'>
							<dt className='text-base font-normal text-gray-300'>Coupon ({coupon.code})</dt>
							<dd className='text-base font-medium text-emerald-400'>-{coupon.discountPercentage}%</dd>
						</dl>
					)}
					<dl className='flex items-center justify-between gap-4 border-t border-gray-600/50 pt-3 mt-3'>
						<dt className='text-xl font-extrabold text-white'>Total</dt>
						<dd className='text-2xl font-extrabold text-emerald-400'>${formattedTotal}</dd>
					</dl>
				</div>

				<div className="space-y-3">
    
					<motion.button
						className='flex w-full items-center justify-center rounded-xl bg-emerald-600 px-5 py-3 text-lg font-bold text-white shadow-lg hover:bg-emerald-700 transition duration-300 focus:outline-none focus:ring-4 focus:ring-emerald-300'
						whileHover={{ scale: 1.02 }}
						whileTap={{ scale: 0.98 }}
						onClick={handlePayment}
					>
						Proceed to Checkout
					</motion.button>
					<Link
						to='/'
						className='flex w-full items-center justify-center gap-2 rounded-xl border-2 border-gray-600 bg-transparent px-5 py-3 text-sm font-medium text-gray-300 hover:bg-gray-700/50 hover:border-emerald-500 transition duration-300'
					>
						Continue Shopping
						<MoveRight size={16} className="text-emerald-500" />
					</Link>
				</div>
			</div>
		</motion.div>
	);
};
export default OrderSummary;