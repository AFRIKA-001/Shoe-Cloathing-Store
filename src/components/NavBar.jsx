import { Search, ShoppingBag, X, Menu, LogOutIcon } from "lucide-react";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import SideBar from "./SideBar";
import JahaIntegratedShield from "../../public/jahaIcon.jsx";
import { motion } from "framer-motion";
import CartContext from "../../store/cartContext.jsx";
import UserAuthContext from "../../store/authContext.jsx";

function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const handleToggle = () => setIsOpen((prev) => !prev);
  
  const cartContext = useContext(CartContext);
  const userAuthctx = useContext(UserAuthContext);

  const totalCartItems = cartContext.items.reduce((total, item) => total + item.quantity, 0);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="sticky top-0 z-50 flex w-full items-center justify-between border-b border-gray-100 bg-black px-6 py-5 backdrop-blur-md lg:px-12"
      >
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <JahaIntegratedShield className="h-20 w-20" />
        </Link>

        {/* Desktop Links - Minimalist Typography */}
        <ul className="hidden items-center gap-10 lg:flex">
          {['Men', 'Women', 'Kids', 'New Arrivals'].map((item) => (
            <li key={item}>
              <Link 
                to={`/${item.toLowerCase().replace(' ', '')}`} 
                className="text-sm font-medium tracking-wide text-gray-600 transition-colors hover:text-white"
              >
                {item}
              </Link>
            </li>
          ))}
        </ul>

        {/* Utilities */}
        <div className="flex items-center gap-6">
          <div className="hidden items-center rounded-full bg-gray-50 px-4 py-2 lg:flex">
            <Search size={16} className="text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              className="ml-2 w-32 bg-transparent text-sm outline-none placeholder:text-gray-400"
            />
          </div>

          <Link to="/cart" className="relative transition-transform hover:scale-105 active:scale-95">
            <ShoppingBag size={24} className="text-gray-400" />
            {totalCartItems > 0 && (
              <span className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-black text-[10px] font-bold text-white">
                {totalCartItems}
              </span>
            )}
          </Link>

          <button onClick={() => userAuthctx.signOut()} className="hidden lg:block">
            <Link to="/signin" className="text-gray-500 transition-colors hover:text-red-600">
              <LogOutIcon size={20} />
            </Link>
          </button>

          {/* Mobile Menu Trigger */}
          <button onClick={handleToggle} className="lg:hidden text-gray-900">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.nav>

      <SideBar isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
}

export default NavBar;