import { Minus, Plus, Trash } from "lucide-react";
  import { useCartStore } from "../stores/useCartStore";

  const CartItem = ({ item }) => {
      const { removeFromCart, updateQuantity } = useCartStore();

      return (
          <div className='rounded-lg border p-4 shadow-sm border-gray-700 bg-gray-800 md:p-6'>
              <div className='space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0'>
                  <div className='shrink-0 md:order-1'>
                      {/* Dòng className dưới đây đã được sửa */}
                      <img className='h-20 w-20 rounded object-cover md:h-32 md:w-32' src={item.image} />
                  </div>
                  <label className='sr-only'>Choose quantity:</label>

                  <div className='flex w-full items-center justify-between md:order-3 md:w-auto'>
                      <div className='flex items-center'>
                          <button
                              type="button"
                              onClick={() => updateQuantity(item._id, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                              className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md
   border
  border-gray-600 bg-gray-700 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-emerald-500
  disabled:cursor-not-allowed disabled:opacity-50"
                          >
                              <Minus className="h-4 w-4 text-gray-300" />
                          </button>
                          <input
                              type="number"
                              className="w-12 shrink-0 border-0 bg-transparent text-center text-sm
  font-medium text-white
    focus:outline-none focus:ring-0"
                              min="1"
                              value={item.quantity}
                              onChange={(e) => {
                                  const newQuantity = e.target.value ? parseInt(e.target.value, 10) : 1;
                                  if (newQuantity > 0) {
                                      updateQuantity(item._id, newQuantity);
                                  }
                              }}
                          />
                          <button
                              type="button"
                              onClick={() => updateQuantity(item._id, item.quantity + 1)}
                              className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md
   border
    border-gray-600 bg-gray-700 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                          >
                              <Plus className="h-4 w-4 text-gray-300" />
                          </button>
                      </div>
                      <div className="text-end md:w-32">
                          <p className="text-base font-bold text-emerald-400">${(item.price *
  item.quantity).toFixed(2)}</p>
                      </div>
                  </div>
                  <div className='w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md'>
                      <p className='text-base font-medium text-white hover:text-emerald-400
  hover:underline'>
                          {item.name}
                      </p>
                      <p className='text-sm text-gray-400'>{item.description}</p>

                      <div className='flex items-center gap-4'>
                          <button
                              type="button"
                              onClick={() => removeFromCart(item._id)}
                              className="flex items-center justify-center h-8 w-8 rounded-full bg-gray-700
  text-gray-400 hover:bg-red-900/50 hover:text-red-500 transition-colors duration-200"
                          >
                              <Trash className="h-4 w-4" />
                          </button>
                      </div>
                  </div>
              </div>
          </div>
      );
  };
  export default CartItem;