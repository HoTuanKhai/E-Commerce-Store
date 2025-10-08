 import { useRef } from "react";
  import { ShoppingCart, ChevronLeft, ChevronRight } from "lucide-react";
  import { useCartStore } from "../stores/useCartStore";

  const FeaturedProducts = ({ featuredProducts }) => {
    const scrollContainerRef = useRef(null);

    const { addToCart } = useCartStore();

    const scroll = (scrollOffset) => {
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollBy({ left: scrollOffset, behavior: 'smooth' });
      }
    };

    return (
      <div className='py-16'>
        <div className='container mx-auto px-4'>
          <h2 className='text-center text-5xl sm:text-6xl font-bold text-emerald-400 mb-12'>Featured Products</h2>
          <div className='relative group'>
            <div
              ref={scrollContainerRef}
              className='flex overflow-x-auto scroll-smooth snap-x snap-mandatory py-4 -mx-2'
              style={{ scrollbarWidth: 'none', '-ms-overflow-style': 'none' }}
            >
              {featuredProducts?.map((product) => (
                <div key={product._id} className='w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 flex-shrink-0 px-2 snap-center'>
                  <div className='bg-white bg-opacity-10 backdrop-blur-sm rounded-lg shadow-lg overflow-hidden h-full transition-all
  duration-300 hover:shadow-2xl border border-emerald-500/30 transform hover:-translate-y-1'>
                    <div className='overflow-hidden'>
                      <img
                        src={product.image}
                        alt={product.name}
                        className='w-full h-56 object-cover transition-transform duration-300 ease-in-out hover:scale-110'
                      />
                    </div>
                    <div className='p-6'>
                      <h3 className='text-xl font-semibold mb-2 text-white truncate'>{product.name}</h3>
                      <p className='text-emerald-300 font-bold text-2xl mb-4'>
                        ${product.price.toFixed(2)}
                      </p>
                      <button
                        onClick={() => addToCart(product)}
                        className='w-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-3 px-4 rounded-lg
  transition-colors duration-300
  flex items-center justify-center text-lg transform hover:scale-105'
                      >
                        <ShoppingCart className='w-6 h-6 mr-3' />
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => scroll(-300)}
              className='absolute top-1/2 -left-4 transform -translate-y-1/2 p-3 rounded-full bg-black bg-opacity-50
  hover:bg-opacity-75 transition-all duration-300 opacity-0 group-hover:opacity-100 disabled:opacity-25 disabled:cursor-not-allowed
  z-10'
            >
              <ChevronLeft className='w-8 h-8 text-white' />
            </button>

            <button
              onClick={() => scroll(300)}
              className='absolute top-1/2 -right-4 transform -translate-y-1/2 p-3 rounded-full bg-black bg-opacity-50
  hover:bg-opacity-75 transition-all duration-300 opacity-0 group-hover:opacity-100 disabled:opacity-25 disabled:cursor-not-allowed
  z-10'
            >
              <ChevronRight className='w-8 h-8 text-white' />
            </button>
          </div>
        </div>
      </div>
    );
  };

  export default FeaturedProducts;