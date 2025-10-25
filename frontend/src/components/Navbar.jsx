import { ShoppingCart, UserPlus, LogIn, LogOut, Lock, LayoutDashboard } from "lucide-react";
import { Link } from "react-router-dom";
import { useUserStore } from "../stores/useUserStore";
import { useCartStore } from "../stores/useCartStore";

const Navbar = () => {
	const { user, logout } = useUserStore();
	const isAdmin = user?.role === "admin";
	const { cart } = useCartStore();

	return (
		<header className='fixed top-0 left-0 w-full bg-gray-900/90 backdrop-blur-lg z-40 border-b border-gray-800 shadow-inner shadow-gray-800/50'>
			<div className='container mx-auto px-4 py-3'>
				<div className='flex flex-wrap justify-between items-center'>
					<Link to='/' className='text-3xl font-extrabold text-emerald-400 tracking-wider hover:text-emerald-300 transition duration-300'>
						E-Commerce
					</Link>

					<nav className='flex flex-wrap items-center gap-4'>
						<Link
							to={"/"}
							className='text-gray-300 hover:text-emerald-400 transition duration-300
					 ease-in-out'
						>
							Home
						</Link>
						{user && (
							<Link
								to={"/cart"}
								className='relative group flex items-center gap-1 text-gray-300 hover:text-teal-400 transition duration-300'
							>
								<ShoppingCart className='inline-block group-hover:text-teal-400' size={22} />
								{/* <span className='hidden sm:inline'>Cart</span> */}
								{cart.length > 0 && (
									<span
										className='absolute -top-2 -right-3 bg-red-500 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs font-bold ring-1 ring-white/70 '
									>
										{cart.length}
									</span>
								)}
							</Link>
						)}
						{isAdmin && (
							<Link
								className='bg-teal-600 hover:bg-teal-700 text-white px-3 py-2 rounded-lg font-bold shadow-lg shadow-teal-500/50 transition duration-300 ease-in-out flex items-center whitespace-nowrap'
								to={"/secret-dashboard"}
							>
								<LayoutDashboard className='inline-block mr-2' size={18} />
								<span className='hidden sm:inline'>Dashboard</span>
							</Link>
						)}

						{user ? (
							<button
								className='bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-lg flex items-center transition duration-300 ease-in-out'
								onClick={logout}
							>
								<LogOut size={18} />
								<span className='hidden sm:inline ml-2'>Log Out</span>
							</button>
						) : (
							<>
								<Link
									to={"/signup"}
									className='bg-teal-500 hover:bg-teal-600 text-white py-2 px-4 rounded-lg font-semibold shadow-xl shadow-teal-500/50 flex items-center transition duration-300'
								>
									<UserPlus className='mr-2' size={18} />
									Sign Up
								</Link>
								<Link
									to={"/login"}
									className='text-gray-300 hover:text-teal-400 py-2 px-4 rounded-lg font-medium flex items-center transition duration-300'
								>
									<LogIn className='mr-2' size={18} />
									Login
								</Link>
							</>
						)}
					</nav>
				</div>
			</div>
		</header>
	);
};
export default Navbar;