import { motion } from "framer-motion";
import { Trash, Star, Loader, Pencil } from "lucide-react";
import { useProductStore } from "../stores/useProductStore";
import { useState } from "react";
import toast from "react-hot-toast";
import CreateProductForm from "../components/CreateProductForm";

const ProductsList = () => {
	const { deleteProduct, toggleFeaturedProduct, products } = useProductStore();
	const [updatingId, setUpdatingId] = useState(null)

	const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

	const handleToggleFeatured = async (productId) => {
      setUpdatingId(productId);
      try {
          await toggleFeaturedProduct(productId);
      } catch (error) {
          console.error("Failed to toggle featured status:", error);
      } finally {
          setUpdatingId(null);
      }
    };

  	const handleDeleteClick = async (productId, productName) => {
          if (window.confirm(`Are you sure you want to delete "${productName}"?`)) {
              try {
                  await deleteProduct(productId);
                  toast.success("Product deleted successfully!");
              } catch (error) {
                  toast.error("Failed to delete product.");
                  console.error("Failed to delete product:", error);
              }
          }
    };

	const handleEditClick = (product) => {
        setSelectedProduct(product);
        setIsEditModalOpen(true);
    };

	const handleCloseModal = () => {
        setIsEditModalOpen(false);
        setSelectedProduct(null);
    };

	console.log("products", products);

	return (
	<>
		<motion.div
			className='bg-gray-800 shadow-lg rounded-lg overflow-hidden max-w-4xl mx-auto'
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.8 }}
		>
			<table className=' min-w-full divide-y divide-gray-700 table-fixed'>
				<thead className='bg-gray-700'>
					<tr>
						<th
							scope='col'
							className='px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider w-2/5'
						>
							Product
						</th>
						<th
							scope='col'
							className='px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider w-1/5' 
						>
							Price
						</th>
						<th
							scope='col'
							className='px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider w-1/5'
						>
							Category
						</th>

						<th
							scope='col'
							className='px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'
						>
							Featured
						</th>
						<th
							scope='col'
							className='px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider' colSpan={2}
						>
							Actions
						</th>
					</tr>
				</thead>

				<tbody className='bg-gray-800 divide-y divide-gray-700'>
					{products?.map((product) => (
						<tr key={product._id} className='hover:bg-gray-700'>
							<td className='px-6 py-4'>
								<div className='flex items-center'>
									<div className='flex-shrink-0 h-10 w-10'>
										<img
											className='h-10 w-10 rounded-full object-cover'
											src={product.image}
											alt={product.name}
										/>
									</div>
									<div className='ml-4'>
										<div className='text-sm font-medium text-white' title={product.name} style={{ maxWidth: '300px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{product.name}</div>
									</div>
								</div>
							</td>
							<td className='px-6 py-4'>
								<div className='text-sm text-gray-300'>${product.price.toFixed(2)}</div>
							</td>
							<td className='px-6 py-4'>
								<div className='text-sm text-gray-300'>{product.category}</div>
							</td>
							<td className='px-6 py-4 whitespace-nowrap'>
								<button
									onClick={() => handleToggleFeatured(product._id)}
									disabled={updatingId === product._id}
									className={`p-1 rounded-full ${
										product.isFeatured ? "bg-yellow-400 text-gray-900" : "bg-gray-600 text-gray-300"
									} hover:bg-yellow-500 transition-colors duration-200 disabled:opacity-50 disabled:cursor-wait`}
								>
									{updatingId === product._id ? (
										<Loader className="h-5 w-5 animate-spin text-yellow-400" />
									) : (
									<Star 
										className={'h-5 w-5 ' + (product.isFeatured ? 'text-yellow-400' : 'text-gray-500')}
              							fill={product.isFeatured ? 'currentColor' : 'none'}
									/>
									)} 
								</button>
							</td>
							<td className='px-6 py-4 whitespace-nowrap text-sm font-medium'>
                                      <button onClick={() => handleEditClick(product)}
  className='text-blue-400 hover:text-blue-300'>
                                          <Pencil className='h-5 w-5' />
                                      </button>
                                  </td>
                                  <td className='px-6 py-4 whitespace-nowrap text-sm font-medium'>
                                      <button onClick={() => handleDeleteClick(product._id, product.name)}
  className='flex items-center justify-center h-8 w-8 rounded-full bg-gray-700 text-gray-400
  hover:bg-red-900/50 hover:text-red-500 transition-colors duration-200'>
                                          <Trash className='h-5 w-5' />
                                      </button>
                                  </td>
						</tr>
					))}
				</tbody>
			</table>
		</motion.div>
		{isEditModalOpen && (
                  <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center
     z-50 overflow-y-auto py-12">
                      <div className="bg-slate-900 rounded-lg shadow-xl relative w-full max-w-2xl">
                          <button onClick={handleCloseModal} className="absolute top-2 right-2 text-gray-400
   hover:text-white text-3xl font-bold">&times;</button>
                          <CreateProductForm productToEdit={selectedProduct} onFormSubmit={handleCloseModal}
   />
                      </div>
                  </div>
              )}
	</>
	);
};
export default ProductsList;