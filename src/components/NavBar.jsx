import { Search,ShoppingBag ,X ,Menu, LogOutIcon } from "lucide-react"
import { useContext, useState } from "react"
import  { Link }  from "react-router-dom"
import SideBar from "./SideBar";
import JahaIntegratedShield from "../../public/jahaIcon.jsx";
import { motion } from "framer-motion";
import CartContext from "../../store/cartContext.jsx";
import UserAuthContext from "../../store/authContext.jsx";
// import { SearchContext } from "../../store/SearchContext.jsx";

function NavBar() { 
  const [isOpen , setIsOpen] = useState(false);
  const handleToggle = () => {setIsOpen(!isOpen)}
  const listStyles = 'hover:underline active:scale-105'

  const cartContext = useContext(CartContext)
  const userAuthctx = useContext(UserAuthContext)
  // const {setSearchTerm} = useContext(SearchContext)

 const totalCartItems = cartContext.items.reduce((totalNumberOfItems,item)=>{
  return totalNumberOfItems + item.quantity ;
 },0)

 const handleLogout = async () => {
  userAuthctx.signOut();
 }

  return (
    <>
      <motion.nav  initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{duration:0.8,ease:"anticipate" }} className="bg-black sticky z-50 top-0 border-b border-b-white/40 flex items-center justify-between p-4 lg:p-8 text-white w-full">
        <h1 className="text-white font-bold text-xl">
          <Link to='/' className="flex items-center"><JahaIntegratedShield/></Link>
        </h1>

      
<div className="hidden lg:flex items-center group">
  <div className="relative flex items-center">
    <input 
      type="text" 
      placeholder="Search Products..." 
      // onChange={(e) => setSearchTerm(e.target.value)} 
      className="bg-transparent border border-white/40 rounded-full py-1.5 pl-4 pr-10 outline-none focus:border-white  transition-all w-full text-sm font-light " 
    />
    <Search 
      size={18} 
      className="absolute right-4 text-white/60 group-focus-within:text-white transition-colors" 
    />
  </div>
</div>


        {/* Desktop Menu */}
        <ul className="hidden lg:flex gap-6 items-center">
            <li className={listStyles}><Link to='/men'>Men</Link></li>
            <li className={listStyles}><Link to='/women'>Women</Link></li>
            <li className={listStyles}><Link to='/kids'>Kids</Link></li>
            <li className={listStyles}><Link to='/newarrivals'>New</Link></li>
            <Link to='/cart' >
            <ShoppingBag className="text" />
            { totalCartItems > 0 &&
            <span className="top-7 right-16 h-4 w-4 bg-red-600 flex items-center justify-center rounded-full text-xs absolute animate-bounce"> {totalCartItems}</span>
            }
            </Link>

           <button type="button" onClick={handleLogout}>
            <Link to='/signin'><LogOutIcon /></Link>
            </button>
            
        </ul>

        {/* Mobile Toggle Button */}
        <div className="flex items-center lg:hidden">
        <button 
          onClick={handleToggle}
          className="lg:hidden z-60 p-2 text-white" // High z-index to stay above sidebar
          aria-label="Toggle Menu"
        >
          {isOpen ? <X className="text-red-600"/> : <Menu/>}
        </button>
        <button>
          <Link to='/cart' className="lg:hidden flex items-center relative right-[-10px]">
          {totalCartItems > 0 &&
              <span className="  relative top-[-10px] right-[-30px]  h-4 w-4 rounded-full bg-red-600 flex items-center justify-center animate-bounce">{totalCartItems}</span>}
        <ShoppingBag size={25}/>
        
        </Link>
        </button>
           </div>
      </motion.nav>

      
      <SideBar isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  )
}

export default NavBar;


































