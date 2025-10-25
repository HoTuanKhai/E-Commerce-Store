import { Minus, Plus, Trash } from "lucide-react";
import { useCartStore } from "../stores/useCartStore";

  const CartItem = ({ item }) => {
      const { removeFromCart, updateQuantity } = useCartStore();

      return (

          <div className='rounded-lg border p-4 shadow-xl border-gray-700/80 bg-gray-800/80 md:p-6 relative'>

              <div className='space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0'>

                {/* Nút Remove Item (VỊ TRÍ MỚI - Góc trên bên phải) */}

                <button

                    type="button"

                    onClick={() => removeFromCart(item._id)}

                    className="absolute top-4 right-4 flex items-center justify-center h-8 w-8 rounded-full 

                               bg-gray-700/70 text-gray-400 hover:bg-red-800/70 hover:text-red-400 

                               transition-colors duration-200 shadow-md"

                    aria-label="Remove item"

                >

                    <Trash className="h-4 w-4" />

                </button>

                

                  <div className='shrink-0 md:order-1'>

                      <img className='h-20 w-20 rounded-lg object-contain md:h-32 md:w-32 ring-1 ring-gray-700' 

                             src={item.image} 

                             alt={item.name} />

                  </div>



                {/* KHỐI THÔNG TIN SẢN PHẨM MỚI (Tên & Mô tả ngắn gọn) */}

                <div className='w-full min-w-0 flex-1 space-y-2 md:order-2 md:max-w-md pr-12'> {/* pr-12 để tránh đè nút Xóa */}

                    <p className='text-lg font-semibold text-white hover:text-emerald-400 hover:underline line-clamp-2'>

                        {item.name}

                    </p>

                    <p className='text-sm text-gray-400 line-clamp-2'>{item.description}</p>

                    <div className='h-2'></div> 

                </div>

                

                  <div className='flex w-full items-center justify-between md:order-3 md:w-auto'>

                      <div className='flex items-center border border-gray-600 rounded-lg overflow-hidden'> 

                          <button

                              type="button"

                              onClick={() => updateQuantity(item._id, item.quantity - 1)}

                              disabled={item.quantity <= 1}

                              className="inline-flex h-10 w-10 shrink-0 items-center justify-center border-r border-gray-600 

                                   bg-gray-700 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:z-10 

                                   disabled:cursor-not-allowed disabled:opacity-50 transition duration-150"

                          >

                              <Minus className="h-4 w-4 text-gray-300" />

                          </button>

                          <input

                              type="number"

                              className="w-12 shrink-0 border-0 bg-transparent text-center text-lg font-medium text-white

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

                              className="inline-flex h-10 w-10 shrink-0 items-center justify-center border-l border-gray-600 

                                   bg-gray-700 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:z-10 transition duration-150"

                          >

                              <Plus className="h-4 w-4 text-gray-300" />

                          </button>



                      </div>

                      <div className="text-end md:w-32">

                          <p className="text-xl font-extrabold text-emerald-400">${(item.price *

  item.quantity).toFixed(2)}</p>

                      </div>

                  </div>

              </div>

          </div>

      );

  };

  export default CartItem;

