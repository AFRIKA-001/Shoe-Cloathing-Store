import { Search,ShoppingBag } from "lucide-react"
import  { Link }  from "react-router-dom"

function NavBar() { 
    const listStyles='hover:underline active:scale-105'
  return (
    <>
    <nav className="bg-black sticky z-50 top-0 border-b border-b-white/40 flex items-center p-2 lg:p-8 text-white w-full">
        <h1 className="text-white">
            <Link to='/'>JAHA</Link>
            </h1>
        <button className="flex mx-auto"><input type="text" className="border border-white rounded-l-xl outline-0 pl-1 border-r-0" />
        <Search className="text-white border h-8 rounded-r-xl" />
        </button>
        <ul className="flex gap-4">
            <li className={listStyles}>
               <Link to='/men'>Men</Link> 
            </li>
            <li className={listStyles}>
               <Link to='/women'>Women</Link> 
            </li>
            <li className={listStyles}>
               <Link to='/kids'>Kids</Link> 
            </li>
            <li className={listStyles}>
               <Link to='/newarrivals'>New</Link> 
            </li>
        </ul>
       <ShoppingBag/>
    </nav>
    
    
    </>
    
  )
}

export default NavBar
