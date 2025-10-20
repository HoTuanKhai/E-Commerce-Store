import { BarChart, PlusCircle, ShoppingBasket, Users, PackageCheck } from "lucide-react";
  import { useEffect, useState } from "react";
  import { motion } from "framer-motion";

  import AnalyticsTab from "../components/AnalyticsTab";
  import CreateProductForm from "../components/CreateProductForm";
  import ProductsList from "../components/ProductsList";
  import UsersList from "../components/UsersList";
  import OrdersList from "../components/OrdersList";
  import { useProductStore } from "../stores/useProductStore";

  const tabs = [
      { id: "create", label: "Create Product", icon: PlusCircle },
      { id: "products", label: "Products", icon: ShoppingBasket },
      { id: "analytics", label: "Analytics", icon: BarChart },
      { id: "users", label: "Users", icon: Users },
      { id: "orders", label: "Orders", icon: PackageCheck },
  ];

  const AdminPage = () => {
      const [activeTab, setActiveTab] = useState("create");
      const { fetchAllProducts } = useProductStore();

      useEffect(() => {
          fetchAllProducts();
      }, [fetchAllProducts]);

      const contentWrapperClass = activeTab === 'create' || activeTab === 'products' || activeTab === 'analytics' || activeTab === 'users' || activeTab === 'orders'
          ? 'flex-grow flex flex-col justify-center items-center'
          : '';

      return (
          <div className='min-h-screen relative overflow-hidden flex flex-col'>
              <div className='h-20' />
              <div className='relative z-10 container mx-auto px-4 flex-grow flex flex-col'>
                  <motion.h1
                      className='text-4xl font-bold !mb-12 text-emerald-400 text-center'
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8 }}
                  >
                      Admin Dashboard
                  </motion.h1>

                  <div className='flex justify-center mb-8'>
                      {tabs.map((tab) => (
                          <button
                              key={tab.id}
                              onClick={() => setActiveTab(tab.id)}
                              className={`flex items-center px-4 py-2 !mx-4 rounded-md transition-colors
  duration-200 ${
                                  activeTab === tab.id
                                      ? "bg-emerald-600 text-white"
                                      : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                              }`}
                          >
                              <tab.icon className='mr-2 h-5 w-5' />
                              {tab.label}
                          </button>
                      ))}
                  </div>

                  <div className={contentWrapperClass}>
                      {activeTab === "create" && <CreateProductForm />}

                      {activeTab === "products" && (
                          <div className="w-full max-w-4xl">
                              <ProductsList />
                          </div>
                      )}

                      {activeTab === "analytics" && (
						  <div className="w-full max-w-7xl">
              				  <AnalyticsTab />
          				  </div>
					  )}
                      {activeTab === "users" && (
                        <div className="w-full max-w-4xl">
                            <UsersList />
                        </div>
                      )}
                      {activeTab === "orders" && (
                        <div className="w-full max-w-4xl">
                            <OrdersList />
                        </div>
                      )}
                  </div>
              </div>
          </div>
      );
  };

  export default AdminPage;