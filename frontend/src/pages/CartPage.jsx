 import { Link } from "react-router-dom";
  import { useCartStore } from "../stores/useCartStore";
  import { motion } from "framer-motion";
  import { ShoppingCart } from "lucide-react";
  import CartItem from "../components/CartItem";
  import PeopleAlsoBought from "../components/PeopleAlsoBought";
  import OrderSummary from "../components/OrderSummary";
  import GiftCouponCard from "../components/GiftCouponCard";

  const CartPage = () => {
      const { cart } = useCartStore();
      const cartFilledClasses = 'mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8';
      const emptyCartClasses = 'center-full-viewport';

      return (
          <div className='pt-20'>
            <div className='h-20' />
              <div className='mx-auto max-w-screen-xl px-4 2xl:px-0'>
                  <div className={cart.length > 0 ? cartFilledClasses : emptyCartClasses}>
                      <motion.div
                          className={`mx-auto w-full flex-none ${
                              cart.length > 0
                                  ? "lg:max-w-2xl xl:max-w-4xl"
                                  : ""
                          }`}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: 0.2 }}
                      >
                          {cart.length === 0 ? (
                              <EmptyCartUI />
                          ) : (
                              <div className='space-y-6'>
                                  {cart.map((item) => (
                                      <CartItem key={item._id} item={item} />
                                  ))}
                              </div>
                          )}

						  <div className='h-9' />
						  
                          {cart.length > 0 && (
                            <div className="mt-12 pt-8 border-t border-gray-700/50">
                              <div className="mt-8 text-center font-bold">
                                  <PeopleAlsoBought />
                              </div>
                            </div>
                          )}
                      </motion.div>
                      {cart.length > 0 && (
                          <motion.div
                              className='mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full'
                              initial={{ opacity: 0, x: 20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.5, delay: 0.4 }}
                          >
                              <OrderSummary />
                              <GiftCouponCard />
                          </motion.div>
                      )}
                  </div>
              </div>
          </div>
      );
  };
  export default CartPage;

  const EmptyCartUI = () => (
      <motion.div
          className='flex flex-col items-center space-y-6'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
      >
          <ShoppingCart className='h-24 w-24 text-gray-300' />
          <h3 className='text-2xl font-semibold text-gray-100'>Your cart is empty</h3>
          <p className='text-gray-400'>Looks like you {"haven't"} added anything to your cart yet.</p>
          <Link
              className='bg-teal-500 hover:bg-teal-400 text-white px-4 py-2 rounded-lg font-semibold shadow-lg shadow-teal-500/50 hover:shadow-xl transition duration-300'
              to='/'
          >
              Start Shopping
          </Link>
      </motion.div>
  );