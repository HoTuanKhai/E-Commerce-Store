 import { useRef } from "react";
  import { ChevronLeft, ChevronRight } from "lucide-react";
  import ProductCard from "./ProductCard"; // Giả sử ProductCard.jsx cùng thư mục

  const FeaturedProducts = ({ featuredProducts }) => {
      const scrollContainerRef = useRef(null);

      const scroll = (scrollOffset) => {
          if (scrollContainerRef.current) {
              scrollContainerRef.current.scrollBy({ left: scrollOffset, behavior: 'smooth' });
          }
      };

      return (
          <div className='py-16'>
              <div className='container mx-auto px-4'>
                  <h2 className='text-center text-5xl sm:text-6xl font-bold text-emerald-400 mb-12'>Featured
  Products</h2>
                  <div className='relative group'>
                      <div
                          ref={scrollContainerRef}
                          className='flex overflow-x-auto scroll-smooth snap-x snap-mandatory py-4 -mx-2'
                          style={{ scrollbarWidth: 'none', '-ms-overflow-style': 'none' }}
                      >
                          {featuredProducts?.map((product) => (
                              <div key={product._id} className='w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 flex-shrink-0 px-2
  snap-center'>
                                  {/* THAY THẾ TOÀN BỘ THẺ CŨ BẰNG COMPONENT NÀY */}
                                  <ProductCard product={product} />
                              </div>
                          ))}
                      </div>

                      <button
                          onClick={() => scroll(-300)}
                          className='absolute top-1/2 -left-4 transform -translate-y-1/2 p-3 rounded-full bg-black
  bg-opacity-50 hover:bg-opacity-75 transition-all duration-300 opacity-0 group-hover:opacity-100 disabled:opacity-25
  disabled:cursor-not-allowed z-10'
                      >
                          <ChevronLeft className='w-8 h-8 text-white' />
                      </button>

                      <button
                          onClick={() => scroll(300)}
                          className='absolute top-1/2 -right-4 transform -translate-y-1/2 p-3 rounded-full bg-black
  bg-opacity-50 hover:bg-opacity-75 transition-all duration-300 opacity-0 group-hover:opacity-100 disabled:opacity-25
  disabled:cursor-not-allowed z-10'
                      >
                          <ChevronRight className='w-8 h-8 text-white' />
                      </button>
                  </div>
              </div>
          </div>
      );
  };

  export default FeaturedProducts;