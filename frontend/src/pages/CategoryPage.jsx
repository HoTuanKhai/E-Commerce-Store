import { useEffect, useState, useMemo, useCallback } from "react";
import { useProductStore } from "../stores/useProductStore";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import ProductCard from "../components/ProductCard";
import { ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';

const PRODUCTS_PER_PAGE = 20;

const CategoryPage = () => {
    const { fetchProductsByCategory, products: fetchedProducts, isLoading } = useProductStore();
    const { category } = useParams();

    const [sortBy, setSortBy] = useState('rating');
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [isSortOpen, setIsSortOpen] = useState(false);

    useEffect(() => {
        fetchProductsByCategory(category);
        setCurrentPage(1); 
    }, [fetchProductsByCategory, category]);

    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, sortBy]);

    const products = useMemo(() => {
        if (!fetchedProducts) return { paginatedProducts: [], totalPages: 0, totalCount: 0 };

        let currentProducts = fetchedProducts.filter(product =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase())
        );

        switch (sortBy) {
            case 'price_asc':
                currentProducts.sort((a, b) => (a.price || 0) - (b.price || 0)); 
                break;
            case 'price_desc':
                currentProducts.sort((a, b) => (b.price || 0) - (a.price || 0));
                break;
            default:
                break;
        }

        const totalCount = currentProducts.length;
        const totalPages = Math.ceil(totalCount / PRODUCTS_PER_PAGE);
        
        const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
        const endIndex = startIndex + PRODUCTS_PER_PAGE;
        const paginatedProducts = currentProducts.slice(startIndex, endIndex);

        return { paginatedProducts, totalPages, totalCount };
    }, [fetchedProducts, sortBy, searchTerm, currentPage]);

    const { paginatedProducts, totalPages, totalCount } = products; 

    const CategoryTitle = category.charAt(0).toUpperCase() + category.slice(1);

    const SortDropdown = () => (
        <div className="relative inline-block text-left z-10 w-full"> 
            <button
                onClick={() => setIsSortOpen(!isSortOpen)} 
                className="inline-flex justify-center items-center rounded-lg px-4 py-2 bg-gray-800/50 text-sm font-medium text-gray-300 hover:bg-gray-700/50 transition duration-150 border border-gray-700 w-full"
            >
                <ChevronDown className={`h-4 w-4 mr-1 transition-transform duration-200 ${isSortOpen ? 'rotate-180' : 'rotate-0'}`} />
                Sort By: {sortBy === 'price_asc' ? 'Price: Low to High' : 'Price: High to Low'}
            </button>
            <div id="sort-menu" className={`origin-top-right absolute right-0 mt-2 w-full rounded-md shadow-lg bg-gray-800 ring-1 ring-emerald-900 ${isSortOpen ? '' : 'hidden'}`}>
                <div className="py-1">
                    <button onClick={() => { setSortBy('price_asc'); setIsSortOpen(false); }} className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-emerald-600/50">Price: Low to High</button> 
                    <button onClick={() => { setSortBy('price_desc'); setIsSortOpen(false); }} className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-emerald-600/50">Price: High to Low</button> 
                </div>
            </div>
        </div>
    );

    const PaginationControls = () => {
        if (totalPages <= 1) return null; 

        const handlePageChange = (page) => {
            if (page >= 1 && page <= totalPages) {
                setCurrentPage(page);
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        };

        const maxPagesToShow = 5;
        let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
        let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

        if (endPage - startPage + 1 < maxPagesToShow) {
            startPage = Math.max(1, endPage - maxPagesToShow + 1);
        }

        const pages = [];
        for (let i = startPage; i <= endPage; i++) {
            pages.push(
                <button
                    key={i}
                    onClick={() => handlePageChange(i)}
                    className={`h-10 w-10 mx-1 rounded-full text-sm font-medium transition-colors duration-200 ${
                        i === currentPage
                            ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/40'
                            : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
                    }`}
                >
                    {i}
                </button>
            );
        }
        
        if (startPage > 1) {
            pages.unshift(<span key="start-dots" className="text-gray-400 mx-1">...</span>);
            pages.unshift(<button key={1} onClick={() => handlePageChange(1)} className="h-10 w-10 mx-1 rounded-full text-sm font-medium bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white">1</button>);
        }
        if (endPage < totalPages) {
             pages.push(<span key="end-dots" className="text-gray-400 mx-1">...</span>);
             pages.push(<button key={totalPages} onClick={() => handlePageChange(totalPages)} className="h-10 w-10 mx-1 rounded-full text-sm font-medium bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white">{totalPages}</button>);
        }


        return (
            <div className="flex justify-center items-center mt-16 mb-8 space-x-2">
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="flex items-center justify-center h-10 w-10 rounded-full bg-gray-800 text-gray-300 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200"
                    aria-label="Previous Page"
                >
                    <ChevronLeft size={20} />
                </button>
                
                {pages}

                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="flex items-center justify-center h-10 w-10 rounded-full bg-gray-800 text-gray-300 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200"
                    aria-label="Next Page"
                >
                    <ChevronRight size={20} />
                </button>
            </div>
        );
    };

    return (

        <div className='min-h-screen bg-[#10171a]'> 
          <div className='h-20' /> 
            <div className='relative z-10 max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-12 pb-20'>
                <motion.h1
                    className='text-center text-4xl sm:text-5xl font-extrabold text-emerald-400 mb-4 pt-4'
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    {CategoryTitle} Collection
                </motion.h1>

                <div className='h-5' />
                <motion.p
                    className='text-center text-gray-400 mb-12'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.1 }}
                >
                    Explore the exclusive and latest {CategoryTitle} collection. Showing {paginatedProducts.length} of {totalCount} results.
                </motion.p>
                <div className='h-5' />

                <motion.div 
                    className="flex flex-col sm:flex-row items-center justify-between mb-12 space-y-4 sm:space-y-0 sm:space-x-4 p-4 rounded-xl bg-gray-900/40 border border-gray-800"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <div className="relative w-full sm:w-2/3">
                        <input
                            type="text"
                            placeholder={`Search in ${CategoryTitle}...`}
                            className="w-full bg-gray-800/50 text-gray-200 border border-gray-700 rounded-lg py-3 pl-10 pr-4 focus:ring-emerald-500 focus:border-emerald-500 transition duration-150"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="w-full sm:w-1/3">
                        <SortDropdown /> 
                    </div>
                </motion.div>

                <div className='h-8' />

                {isLoading && (
                    <div className="text-center py-20 col-span-full">
                        <div className="animate-spin h-8 w-8 border-4 border-emerald-500 border-t-transparent rounded-full mx-auto mb-4"></div>
                        <h2 className='text-xl font-semibold text-gray-300'>Loading products...</h2>
                    </div>
                )}

                <div className='h-8' />

                <motion.div
                        className='grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 justify-items-center'
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                >
                    
                    {paginatedProducts?.length === 0 && !isLoading && (
                        <h2 className='text-3xl font-semibold text-gray-300 text-center col-span-full py-16'>
                            No products found matching your criteria.
                        </h2>
                    )}

                    {paginatedProducts?.map((product) => ( 
                        <ProductCard key={product._id} product={product} />
                    ))}
                </motion.div>
              <PaginationControls />
            </div>
        </div>
    );
};
export default CategoryPage;