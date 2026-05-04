
import { Home,  LogOut } from "lucide-react"; 
import { FaMale,FaFemale,FaChild} from "react-icons/fa"
import { HiSparkles } from "react-icons/hi"
import { Link } from "react-router-dom";

function SideBar({ isOpen, setIsOpen }) {
  return (
    <>
      {/* 1. Dark Overlay (Background dim) */}
      <div 
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
        onClick={() => setIsOpen(false)} // Close sidebar when clicking outside
      />

      {/* 2. The Actual Sidebar Panel */}
      <aside className={`fixed top-0 left-0 h-full w-64 bg-black text-white z-50 transform transition-transform duration-300 ease-in-out p-6 border-r border-white/20 
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        
        <h2 className="text-lg font-semibold mb-8 border-b border-white/20 pb-2">Hello Jaha User 👋</h2>

        <ul className="flex flex-col gap-6">
          <li onClick={() => setIsOpen(false)}>
            <Link to="/" className="flex items-center gap-3"><Home/> Home</Link>
          </li>

          <li onClick={() => setIsOpen(false)}>
            <Link to="/men" className="flex items-center gap-3"><FaMale></FaMale>Men</Link>
          </li>
        
        <li onClick={() => setIsOpen(false)}> 
         <Link to='/women' className="flex items-center gap-3"><FaFemale></FaFemale>Women</Link>
          </li>

          <li onClick={() => setIsOpen(false)}> 
         <Link to='/kids' className="flex items-center gap-3"><FaChild></FaChild>Kids</Link>
          </li>

          <li onClick={() => setIsOpen(false)}> 
         <Link to='/newarrivals' className="flex items-center gap-3"><HiSparkles></HiSparkles>New Arrivals</Link>
          </li>


        </ul>

        <div className="absolute bottom-10">
          <button  onClick={() => setIsOpen(false)}>
            <Link to='/signin' className="flex items-center gap-3 text-red-400">
              <LogOut size={20}/> LogOut
            </Link>
          
            </button>
        </div>
      </aside>
    </>
  );
}

export default SideBar;























// 
// import { Link } from "react-router-dom"
// import { BiLogOut } from "react-icons/bi"


// function SideBar() {
//   return (
//     <div className="bg-black w-64 text-white space-y-4 pl- list-none h-scree ">
//     <p className="font-bold text-white pt-4">Hello Jaha User 👋🏼</p>
//      <hr />
// <ul className="space-y-3">
//      <li >
//     <Link to='/' className="flex items-center gap-2" >
//      <FaHome className="w-4 h-4 "></FaHome>
//      Home
//      </Link>
//      </li>
//      <li>
//         <Link to='/men' className="flex items-center gap-2" >
//      <FaMale className="w-5 h-5"></FaMale>
//      Men
//      </Link>
     
//      </li>
//      <li>
//         <Link to='/women' className="flex items-center gap-2">
//      <FaFemale className="w-5 h-5"></FaFemale>
//      Women
//      </Link>
     
//      </li>
//      <li>
//         <Link to='/kids' className="flex items-center gap-2" >
//      <FaChild className="w-5 h-5">Home</FaChild>
//      Kids
//      </Link>
     
//      </li>
//      <li>
//         <Link to='/newarrivals' className="flex items-center gap-2" >
//      <HiSparkles className="w-5 h-5">Home</HiSparkles>
//      New Arrivals
//      </Link>
     
//      </li>
     
// </ul>
    
//      <button className="pt-40">
//         <Link to='/signin' className="flex items-center gap-2">
//         <BiLogOut></BiLogOut>
//         LogOut
        
//         </Link>
//      </button>

//     </div>
//   )
// }

// export default SideBar