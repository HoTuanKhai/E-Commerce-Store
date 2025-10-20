import { useEffect } from "react";
  import { useOrderStore } from "../stores/useOrderStore";
  import { Loader } from "lucide-react";

  const OrdersList = () => {
      const { orders, fetchAllOrders, loading } = useOrderStore();

      useEffect(() => {
          fetchAllOrders();
      }, [fetchAllOrders]);

      if (loading) {
          return (
              <div className="flex justify-center items-center h-64">
                  <Loader className="h-8 w-8 animate-spin" />
              </div>
          );
      }

      return (
          <div className='bg-gray-800 shadow-lg rounded-lg overflow-hidden max-w-7xl mx-auto w-full'>
              <table className='min-w-full divide-y divide-gray-700'>
                  <thead className='bg-gray-700'>
                      <tr>
                          <th className='px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase
  tracking-wider'>
                              Customer
                          </th>
                          <th className='px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase
  tracking-wider'>
                              Email
                          </th>
                          <th className='px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase
  tracking-wider'>
                              Date
                          </th>
                          <th className='px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase
  tracking-wider'>
                              Total
                          </th>
                          <th className='px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase
  tracking-wider'>
                              Figurines
                          </th>
                      </tr>
                  </thead>
                  <tbody className='bg-gray-800 divide-y divide-gray-700'>
                      {orders.map((order) => (
                          <tr key={order._id} className='hover:bg-gray-700'>
                              <td className='px-6 py-4 whitespace-nowrap'>
                                  <div className='text-sm font-medium text-white'>{order.user?.name || 'N/A'}</div>
                              </td>
                              <td className='px-6 py-4 whitespace-nowrap'>
                                  <div className='text-sm text-gray-300'>{order.user?.email || 'N/A'}</div>
                              </td>
                              <td className='px-6 py-4 whitespace-nowrap'>
                                  <div className='text-sm text-gray-300'>
                                      {new Date(order.createdAt).toLocaleDateString()}
                                  </div>
                              </td>
                              <td className='px-6 py-4 whitespace-nowrap'>
                                  <div className='text-sm font-bold text-emerald-400'>
                                      ${order.totalAmount.toFixed(2)}
                                  </div>
                              </td>
                              <td className='px-6 py-4 whitespace-nowrap'>
                                  <div className='text-sm text-gray-300'>{order.products.length}</div>
                              </td>
                          </tr>
                      ))}
                  </tbody>
              </table>
          </div>
      );
  };

  export default OrdersList;