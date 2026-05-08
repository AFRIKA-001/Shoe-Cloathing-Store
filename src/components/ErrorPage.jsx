import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Search } from "lucide-react";

const ErrorPage = () => {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-4 overflow-hidden relative">
      
      {/* Background Decorative Element */}
      <div className="absolute opacity-10  ">
        <h1 className="text-[20rem] font-black tracking-tighter">404</h1>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="z-10 text-center"
      >
        <span className="text-xs uppercase tracking-[0.5em] text-gray-500 font-bold">
          Lost in the Collection
        </span>
        
        <h1 className="text-6xl md:text-8xl font-extrabold tracking-tighter mt-4 mb-8 uppercase italic">
          Out of <span className="text-red-600">Stock</span>
        </h1>

        <p className="max-w-md mx-auto text-gray-400 text-sm md:text-base leading-relaxed tracking-wide mb-12">
          The page you are looking for doesn't exist or has been moved. 
          Don't let your style journey stop here.
        </p>

        <div className="flex flex-col md:flex-row items-center justify-center gap-6">
          <Link to="/">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 bg-white text-black px-8 py-4 rounded-full font-bold uppercase tracking-widest text-xs transition-all hover:bg-gray-200"
            >
              <ArrowLeft size={16} />
              Return Home
            </motion.button>
          </Link>

          <Link to="/newarrivals">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 border border-white/20 px-8 py-4 rounded-full font-bold uppercase tracking-widest text-xs transition-all hover:bg-white/10"
            >
              <Search size={16} />
              Browse New
            </motion.button>
          </Link>
        </div>
      </motion.div>

      {/* Subtle Footer for Error Page */}
      <div className="absolute bottom-10">
        <p className="text-[10px] uppercase tracking-[0.3em] text-gray-700">
          Error Code: 0xc0000404 // JAHA_SYSTEM_LOST
        </p>
      </div>
    </div>
  );
};

export default ErrorPage;