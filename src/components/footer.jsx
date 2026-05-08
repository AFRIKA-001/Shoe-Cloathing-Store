 import { Link } from "react-router-dom";
import { FaLinkedin, FaInstagram, FaTiktok } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { motion } from "framer-motion";

function Footer() {
  const socialLinks = [
    { icon: <FaLinkedin />, href: "https://www.linkedin.com/in/gabriel-wafula/", color: "hover:text-blue-600" },
    { icon: <FaInstagram />, href: "https://www.instagram.com/developer_gabriel/", color: "hover:text-pink-500" },
    { icon: <FaTiktok />, href: "https://www.tiktok.com/@afrikan_hero1", color: "hover:text-gray-400" },
    { icon: <FaXTwitter />, href: "#", color: "hover:text-gray-400" },
  ];

  return (
    <footer className="bg-black text-white pt-16 pb-8 px-4 border-t border-gray-900">
      <div className="max-w-7xl mx-auto">
        
        {/* Navigation Grid */}
        <ul className="grid grid-cols-2 md:grid-cols-4 gap-8 justify-items-center mb-12">
          {['men', 'women', 'kids', 'newarrivals'].map((item) => (
            <li key={item}>
              <Link 
                to={`/${item}`} 
                className="text-xs uppercase tracking-[0.2em] font-medium hover:text-gray-400 transition-colors"
              >
                {item === 'newarrivals' ? 'New Arrivals' : item}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex flex-col items-center space-y-8">
          <span className="text-[10px] uppercase tracking-[0.3em] text-gray-500">
            Connect with JAHA
          </span>

          {/* Social Icons with subtle hover animation */}
          <div className="flex space-x-8">
            {socialLinks.map((social, index) => (
              <motion.a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -4 }}
                className={`text-xl transition-colors duration-300 ${social.color}`}
              >
                {social.icon}
              </motion.a>
            ))}
          </div>

          {/* Copyright Section */}
          <div className="pt-8 border-t border-gray-900 w-full flex flex-col items-center">
            <p className="text-[10px] text-gray-600 tracking-widest uppercase">
              &copy; {new Date().getFullYear()} jaha fashion and design.ac.ke
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;