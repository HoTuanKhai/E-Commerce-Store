import { useEffect } from "react";
  import { Trash } from "lucide-react";
  import { useUserStore } from "../stores/useUserStore";
  import toast from "react-hot-toast";

  const UsersList = () => {
      const { users, fetchAllUsers, deleteUser, updateUserRole, user: currentUser } = useUserStore();

      useEffect(() => {
          fetchAllUsers();
      }, [fetchAllUsers]);

      const handleDeleteUser = (userId, userName) => {
          if (window.confirm(`Are you sure you want to delete the user "${userName}"?`)) {
              deleteUser(userId);
          }
      };

      return (
          <div className='bg-gray-800 shadow-lg rounded-lg overflow-hidden max-w-4xl mx-auto w-full'>
              <table className='min-w-full divide-y divide-gray-700'>
                  <thead className='bg-gray-700'>
                      <tr>
                          <th className='px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase
  tracking-wider'>
                              Name
                          </th>
                          <th className='px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase
  tracking-wider'>
                              Email
                          </th>
                          <th className='px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase
  tracking-wider'>
                              Role
                          </th>
                          <th className='px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase
  tracking-wider'>
                              Actions
                          </th>
                      </tr>
                  </thead>
                  <tbody className='bg-gray-800 divide-y divide-gray-700'>
                      {users?.map((user) => (
                          <tr key={user._id} className='hover:bg-gray-700'>
                              <td className='px-6 py-4 whitespace-nowrap'>
                                  <div className='text-sm font-medium text-white'>{user.name}</div>
                              </td>
                              <td className='px-6 py-4 whitespace-nowrap'>
                                  <div className='text-sm text-gray-300'>{user.email}</div>
                              </td>
                              <td className='px-6 py-4 whitespace-nowrap'>
                                    <button
                                        onClick={() => updateUserRole(user._id, user.role === 'admin' ? 'customer' : 'admin')}
                                        disabled={currentUser._id === user._id || user.role === 'admin'}
                                        className='disabled:opacity-50 disabled:cursor-not-allowed'
                                        title={
                                            currentUser._id === user._id
                                            ? "Cannot change your own role"
                                            : user.role === 'admin'
                                            ? "Cannot change another admin's role"
                                            : "Change role to admin"
                                        }
                                    >
                                        <span className={'px-2 inline-flex text-xs leading-5 font-semibold rounded-full ' + (user.role === 'admin'
                                ? 'bg-red-200 text-red-800' : 'bg-emerald-200 text-emerald-800')}>
                                            {user.role}
                                        </span>
                                    </button>
                                </td>
                              <td className='px-6 py-4 whitespace-nowrap text-sm font-medium'>
                                  <button
                                      onClick={() => handleDeleteUser(user._id, user.name)}
                                      className='flex items-center justify-center h-8 w-8 rounded-full bg-gray-700
  text-gray-400 hover:bg-red-900/50 hover:text-red-500 transition-colors duration-200'
                                      disabled={user.role === 'admin'}
                                      title={user.role === 'admin' ? 'Cannot delete admin' : 'Delete user'}
                                  >
                                      <Trash className='h-5 w-5' />
                                  </button>
                              </td>
                          </tr>
                      ))}
                    {!users && (
                        <tr>
                            <td colSpan="4" className="text-center py-4 text-white">Loading users...</td>
                        </tr>
                    )}
                  </tbody>
              </table>
          </div>
      );
  };

  export default UsersList;