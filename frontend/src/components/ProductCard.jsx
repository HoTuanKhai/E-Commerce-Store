import toast from "react-hot-toast";
import { ShoppingCart } from "lucide-react";
import { useUserStore } from "../stores/useUserStore";
import { useCartStore } from "../stores/useCartStore";

const ProductCard = ({ product }) => {
	const { user } = useUserStore();
	const { addToCart } = useCartStore();

	const priceFormatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
    }).format(product.price);

	const handleAddToCart = (e) => {
		e.stopPropagation();
		if (!user) {
			toast.error("Please login to add products to cart", { id: "login" });
			return;
		} else {
			// add to cart
			addToCart(product);
		}
	};

	return (
		<div className='flex w-full relative flex-col overflow-hidden rounded-xl 
                       bg-gray-800/50 backdrop-blur-sm shadow-xl transition-all duration-300 
                       hover:shadow-2xl hover:shadow-emerald-900/50 hover:scale-[1.03] cursor-pointer'>
			<div className='relative mx-4 mt-4 overflow-hidden rounded-xl h-[300px]'>
				<img className='object-contain w-full h-full transition-transform duration-300 hover:scale-105 p-4' src={product.image} alt={product.name} loading='eager' />
				<div className='absolute inset-0 bg-opacity-20' />
			</div>

			<div className='mt-4 px-5 pb-5'>
				<h5 className='text-lg font-bold tracking-tight text-white mb-3 line-clamp-2 min-h-[50px]'>{product.name}</h5>
				<div className='mt-2 flex items-center justify-between' style={{ marginBottom: '20px' }} >
					<p>
						<span className='text-3xl font-extrabold text-emerald-400'>{priceFormatted}</span>
					</p>
				</div>
				<button
					className='w-full flex items-center justify-center rounded-lg bg-emerald-600 px-4 py-2 
                               text-center text-sm font-bold text-white shadow-lg shadow-emerald-600/50 
                               hover:bg-emerald-700 transition duration-300 ease-in-out transform hover:-translate-y-0.5'
					onClick={handleAddToCart}
				>
					<ShoppingCart size={22} className='mr-2' />
					Add to cart
				</button>
			</div>
		</div>
	);
};
export default ProductCard;