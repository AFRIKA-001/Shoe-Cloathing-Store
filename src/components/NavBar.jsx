import { Search,ShoppingBag ,X ,Menu} from "lucide-react"
import { useContext, useState } from "react"
import  { Link }  from "react-router-dom"
import SideBar from "./SideBar";
import JahaIntegratedShield from "../../public/jahaIcon.jsx";
import { motion } from "framer-motion";
import CartContext from "../../store/cartContext.jsx";

function NavBar() { 
  const [isOpen , setIsOpen] = useState(false);
  const handleToggle = () => {setIsOpen(!isOpen)}
  const listStyles = 'hover:underline active:scale-105'

  const cartContext = useContext(CartContext)

 const totalCartItems = cartContext.items.reduce((totalNumberOfItems,item)=>{
  return totalNumberOfItems + item.quantity ;
 },0)

  return (
    <>
      <motion.nav  initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{duration:0.8,ease:"anticipate" }} className="bg-black sticky z-50 top-0 border-b border-b-white/40 flex items-center justify-between p-4 lg:p-8 text-white w-full">
        <h1 className="text-white font-bold text-xl">
          <Link to='/' className="flex items-center"><JahaIntegratedShield/></Link>
        </h1>

        {/* Desktop Search */}
        <div className="hidden lg:flex items-center">
          <input type="text" placeholder="search Products..." className=" border border-white rounded-l-xl outline-0 text-white pl-2 h-8" />
          <button className="bg-white text-black border border-white rounded-r-xl h-8 px-2">
            <Search size={20} />
          </button>
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
            <span className="top-7 right-5 h-4 w-4 bg-red-400 flex items-center justify-center rounded-full text-xs absolute animate-bounce"> {totalCartItems}</span>
            }
            </Link>
        </ul>

        {/* Mobile Toggle Button */}
        <button 
          onClick={handleToggle}
          className="lg:hidden z-60 p-2 text-white" // High z-index to stay above sidebar
          aria-label="Toggle Menu"
        >
          {isOpen ? <X className="text-red-600"/> : <Menu/>}
        </button>
      </motion.nav>

      {/* Sidebar Overlay/Component */}
      <SideBar isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  )
}

export default NavBar;



































// function NavBar() { 
// const [isOpen , setIsOpen] = useState(false);

// const handleToggle = () => {setIsOpen(!isOpen)}

//     const listStyles='hover:underline active:scale-105'
//   return (
//     <>
//     <nav className="bg-black sticky  z-50 top-0 border-b border-b-white/40 flex items-center  p-2 lg:p-8 text-white w-full">
//         <h1 className="text-white">
//             <Link to='/'>JAHA</Link>
//             </h1>
//         <button className="flex mx-auto"><input type="text" className="border hidden  lg:flex  border-white rounded-l-xl outline-0 pl-1 border-r-0" />
//         <Search className="hidden lg:flex text-white border h-8 rounded-r-xl" />
//         </button>
//         <ul className="hidden lg:flex gap-4 items-center">
//             <li className={listStyles}>
//                <Link to='/men'>Men</Link> 
//             </li>
//             <li className={listStyles}>
//                <Link to='/women'>Women</Link> 
//             </li>
//             <li className={listStyles}>
//                <Link to='/kids'>Kids</Link> 
//             </li>
//             <li className={listStyles}>
//                <Link to='/newarrivals'>New</Link> 
//             </li>
//             <Link to='/cart'><ShoppingBag/></Link>
//         </ul>
//         {/* //mobile icons appear here */}

//         <button 
//         onClick={handleToggle}
//         className="lg:hidden p-2 text-white"
//         aria-label="Toggle Menu"
//         >
//       {isOpen? <X className="text-red-600"/>:<Menu/>}
//         </button>
       
//        {isOpen && <SideBar/>}


//     </nav>
    
    
//     </>
    
//   )
// }

// export default NavBar
// ... keep your imports ...