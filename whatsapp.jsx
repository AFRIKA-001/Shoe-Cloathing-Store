import { BsWhatsapp } from "react-icons/bs";
import { motion } from "framer-motion";

export const Whatsapp = () => {
  return (
    <motion.div 
      className="fixed bottom-8 right-8 z-50 flex justify-end"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 3, duration: 0.5 }}
    >
      <motion.a
        href="https://wa.me/254714058073" 
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.05, boxShadow: "0px 10px 20px rgba(34, 197, 94, 0.3)" }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3 font-semibold text-white shadow-lg transition-colors hover:bg-[#128C7E]"
      >
        <BsWhatsapp size={20} />
        <span>Talk to us</span>
        
        {/* Subtle Pulse Animation */}
        <span className="absolute -right-1 -top-1 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
          <span className="relative inline-flex h-3 w-3 rounded-full bg-white"></span>
        </span>
      </motion.a>
    </motion.div>
  );
};