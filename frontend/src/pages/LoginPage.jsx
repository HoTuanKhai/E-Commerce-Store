import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { LogIn, ArrowRight, Loader } from "lucide-react";
import { useUserStore } from "../stores/useUserStore";


  const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { login, loading } = useUserStore();

    const handleSubmit = (e) => {
      e.preventDefault();
      console.log(email, password);
      login(email, password);
    };

    return (
      <div className='min-h-screen flex items-center justify-center py-12 sm:px-6 lg:px-8'>
        <div className='sm:mx-auto sm:w-full sm:max-w-lg'>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className='mt-6 text-center text-4xl font-extrabold text-emerald-400'>Sign in to your account</h2>
          <div className='h-5' />
        </motion.div>

        <motion.div
          className='mt-8'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className='bg-[#1e293b] py-12 px-6 shadow sm:rounded-lg sm:px-12'>
            <form onSubmit={handleSubmit} className='space-y-8'>
              <div>
                <label htmlFor='email' className='block text-lg font-medium text-gray-300'>
                  Email address
                </label>
                <div className='mt-1'>
                  <input
                    id='email'
                    type='email'
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className='block w-full px-4 py-3 bg-gray-700 border border-gray-600
  rounded-md shadow-sm
   placeholder-gray-400 focus:outline-none focus:ring-emerald-500
   focus:border-emerald-500 sm:text-lg'
                    placeholder='you@example.com'
                  />
                </div>
              </div>

              <div>
                <label htmlFor='password' className='block text-lg font-medium text-gray-300'>
                  Password
                </label>
                <div className='mt-1'>
                  <input
                    id='password'
                    type='password'
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className='block w-full px-4 py-3 bg-gray-700 border border-gray-600
  rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-lg'
                    placeholder='••••••••'
                  />
                </div>
              </div>

              <button
                type='submit'
                className='w-full flex justify-center py-2 px-4 border border-transparent 
							rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600
							 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2
							  focus:ring-emerald-500 transition duration-150 ease-in-out disabled:opacity-50'
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader className='mr-2 h-5 w-5 animate-spin' aria-hidden='true' />
                    Loading...
                  </>
                ) : (
                  <>
                    <LogIn className='mr-2 h-5 w-5' aria-hidden='true' />
                    Login
                  </>
                )}
              </button>
            </form>

            <p className='mt-8 text-center text-base text-gray-400'>
              Not a member?{" "}
              <Link to='/signup' className='font-medium text-emerald-400 hover:text-emerald-300'>
              <span className="inline-flex items-center">
                Sign up now <ArrowRight className='ml-1 h-4 w-4' />
              </span>
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
      </div>
    );
  };
  export default LoginPage;