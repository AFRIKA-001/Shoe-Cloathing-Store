import { Link } from "react-router-dom";
import { FaLinkedin, FaInstagram, FaTiktok } from "react-icons/fa"
import { FaXTwitter } from "react-icons/fa6";
import { motion } from "framer-motion";

function Footer() {
  return (
    <div className="bg-black h-70 lg:h-80 text-white absolute w-full ">
      <ul className="grid grid-cols-4 lg:grid-cols-4 justify-items-center py-8 space-y-6  ">
        <li><Link to ='/men' className="hover:text-red-500">Men</Link> </li>
        <li> <Link to ='/women'  className="hover:text-red-500">Women</Link></li>
          <li> <Link to ='/kids'  className="hover:text-red-500">kids</Link></li>
            <li> <Link to ='/newarrivals'  className="hover:text-red-500">New Arrivals</Link></li>
      </ul>
      <h1 className=" pl-12 lg:pl-25 pb-4 underline">Follow us </h1>
      <motion.div animate={{y:[10,100,10]}} className="grid grid-cols-4 lg:grid-cols-4 justify-items-center list-none space-y-6">
          
          <li> <a href="https://www.linkedin.com/in/gabriel-wafula/" target="_blank" rel="noopener noreferrer"><FaLinkedin  className="text-blue-700"/> </a></li>
        <li><a href="https://www.instagram.com/developer_gabriel/" target="_blank" rel="noopener noreferrer"><FaInstagram className="text-pink-600"/></a></li>
        <li><a href="https://www.tiktok.com/@afrikan_hero1" target="_blank" rel="noopener noreferrer" ><FaTiktok className="text-pink-600"/></a></li>
        <li><a href="" target="_blank" rel="noopener noreferrer"><FaXTwitter /></a></li>
    
      </motion.div>
      <p className="flex justify-center text-gray-300 pt-6">&copy; jaha fashion and design.ac.ke</p>
    </div>
  )
}

export default Footer;
