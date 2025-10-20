import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { PlusCircle, Loader, ImageIcon } from "lucide-react";
import { useProductStore } from "../stores/useProductStore";
import toast from "react-hot-toast"; 

  const categories = ["one_piece", "naruto", "pokemon", "genshin_impact", "kimetsu_no_yaiba",
  "sword_art_online"];

  const CreateProductForm = ( {productToEdit, onFormSubmit} ) => {
      const [newProduct, setNewProduct] = useState({
          name: "",
          description: "",
          price: "",
          category: "",
          image: "",
      });

      const { createProduct, loading } = useProductStore();
	  const { updateProduct } = useProductStore();
	  const isEditMode = Boolean(productToEdit);

	useEffect(() => {
		if (isEditMode) {
			setNewProduct({
				name: productToEdit.name,
				description: productToEdit.description,
				price: productToEdit.price,
				category: productToEdit.category,
				image: productToEdit.image,
			});
		}
	}, [productToEdit, isEditMode]);

      const handleSubmit = async (e) => {
          e.preventDefault();
          try {
              if (isEditMode) {
              	await updateProduct(productToEdit._id, newProduct); 
              	toast.success("Product updated successfully!");
			} else {
				await createProduct(newProduct);
				toast.success("Product added to the shop!");
			}
			if (onFormSubmit) onFormSubmit();
          } catch (error) {
              toast.error("An error occurred.");
              console.error("Form submission error:", error);
          }
      };

      const handleImageChange = (e) => {
          const file = e.target.files[0];
          if (file) {
              const reader = new FileReader();
              reader.onloadend = () => {
                  setNewProduct({ ...newProduct, image: reader.result });
              };
              reader.readAsDataURL(file);
          }
      };

      return (
          <motion.div
              className='bg-slate-900 border-2 border-blue-500 shadow-2xl rounded-2xl p-8 w-full max-w-2xl
  mx-auto'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, type: "spring" }}
          >
              <h2 className='text-4xl font-bold mb-8 text-center text-emerald-400'>
                  {isEditMode ? "Edit Product" : "Create New Product"}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Các trường input không thay đổi */}
                  <div>
                      <label htmlFor='name' className='block text-sm font-medium text-slate-300 mb-1'>
                          Product Name
                      </label>
                      <input
                          type='text'
                          id='name'
                          name='name'
                          value={newProduct.name}
                          onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                          placeholder='e.g., Monkey D. Luffy Gear 5'
                          className='mt-1 block w-full bg-slate-800 border border-slate-600 rounded-lg
  shadow-sm py-3 px-4 text-white placeholder-slate-400 focus:outline-none focus:ring-2
  focus:ring-emerald-500 focus:border-emerald-500 transition-colors duration-300'
                          required
                      />
                  </div>

                  <div>
                      <label htmlFor='description' className='block text-sm font-medium text-slate-300
  mb-1'>
                          Description
                      </label>
                      <textarea
                          id='description'
                          name='description'
                          value={newProduct.description}
                          onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                          rows='4'
                          placeholder='A brief description of the figurine'
                          className='mt-1 block w-full bg-slate-800 border border-slate-600 rounded-lg
  shadow-sm py-3 px-4 text-white placeholder-slate-400 focus:outline-none focus:ring-2
  focus:ring-emerald-500 focus:border-emerald-500 transition-colors duration-300'
                          required
                      />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                          <label htmlFor='price' className='block text-sm font-medium text-slate-300 mb-1'>
                              Price
                          </label>
                          <input
                              type='number'
                              id='price'
                              name='price'
                              value={newProduct.price}
                              onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                              step='0.01'
                              placeholder='29.99'
                              className='mt-1 block w-full bg-slate-800 border border-slate-600 rounded-lg
  shadow-sm py-3 px-4 text-white placeholder-slate-400 focus:outline-none focus:ring-2
  focus:ring-emerald-500 focus:border-emerald-500 transition-colors duration-300'
                              required
                          />
                      </div>

                      <div>
                          <label htmlFor='category' className='block text-sm font-medium text-slate-300
  mb-1'>
                              Category
                          </label>
                          <select
                              id='category'
                              name='category'
                              value={newProduct.category}
                              onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                              className='mt-1 block w-full bg-slate-800 border border-slate-600 rounded-lg
  shadow-sm py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500
  focus:border-emerald-500 transition-colors duration-300'
                              required
                          >
                              <option value='' style={{ backgroundColor: "#1e293b", color: "white" }}>Select
   a category</option>
                              {categories.map((category) => (
                                  <option key={category} value={category} style={{ backgroundColor:
  "#1e293b", color: "white" }}>
                                      {category.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                                  </option>
                              ))}
                          </select>
                      </div>
                  </div>

                  <div>
                      <label className='block text-sm font-medium text-slate-300 mb-1'>
                          Product Image
                      </label>
                      <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-slate-600
  border-dashed rounded-lg">
                          <div className="text-center">
                              <label htmlFor="image" className="cursor-pointer">
                                  {newProduct.image ? (
                                      <img src={newProduct.image} alt="Preview" className="mx-auto h-48
  w-auto rounded-lg object-cover"/>
                                  ) : (
                                      <div>
                                          <div className="flex items-center justify-center">
                                              <ImageIcon className="h-12 w-12 text-slate-400" />
                                              <span className="ml-2 font-medium text-emerald-400">Upload a
  file</span>
                                          </div>
                                          <p className="text-sm text-slate-400">or drag and drop</p>
                                      </div>
                                  )}
                                  <input id="image" name="image" type="file" className="sr-only"
  accept='image/*' onChange={handleImageChange} />
                              </label>
                              <p className="text-xs text-slate-500 mt-2">PNG, JPG, GIF up to 10MB</p>
                          </div>
                      </div>
                  </div>

                  <button
                      type='submit'
                      className='w-full flex justify-center py-3 px-4 border border-transparent rounded-lg
  shadow-lg text-md font-semibold text-white bg-gradient-to-r from-emerald-500 to-teal-600
  hover:from-emerald-600 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2
  focus:ring-emerald-500 focus:ring-offset-slate-900 disabled:opacity-50 disabled:cursor-not-allowed
  transform hover:scale-105 transition-all duration-300'
                      disabled={loading}
                  >
                      {loading ? (
                          <>
                              <Loader className='mr-3 h-6 w-6 animate-spin' aria-hidden='true' />
                              Creating...
                          </>
                      ) : (
                          <>
                              <PlusCircle className='mr-3 h-6 w-6' />
                              {isEditMode ? "Save Changes" : "Create Product"}
                          </>
                      )}
                  </button>
              </form>
          </motion.div>
      );
  };

  export default CreateProductForm;