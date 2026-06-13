import { useState, useEffect, lazy, Suspense } from "react";
import { supabase } from "../store/supabaseClient";
import { Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Carousel from "./components/Carousel";

const CustomProductHook = lazy(() => import("../customProductHook"));

function App() {
  const [shoes, setShoes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const mockSlides =[
    "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1638609348722-aa2a3a67db26?auto=format&fit=crop&w=600&q=80",
    "https://ventifashion.com/wp-content/uploads/2021/01/How-to-Style-a-Clothing-Rack-6.jpg",
    "https://img01.ztat.net/article/spp-media-p1/484227d9029840d3a1a258a6b123016f/c0b878f6e1294bd0843bd23156db0d0e.jpg?imwidth=762",
    "https://www.prisoner.wtf/cdn/shop/files/Stone-Hooded-Puffer-Jacket-004.jpg?v=1702080037&width=1000",
    "https://cdn.shopify.com/s/files/1/0781/4224/3035/files/IMG_20260105_185502.jpg?v=1767620945",
    "https://img.magnific.com/free-photo/girl-wears-fashionable-cloths-white-boots-has-bright-makeup-poses-against-urban-building-poses-making-photo-practices-breakdancing-looks-seriously_273609-54827.jpg?w=740"
    ]
  
  
  

  useEffect(() => {
    const dataFetching = async () => {
      setIsLoading(true);
      const { data, error } = await supabase.from("homepage_shoes").select("*");
      if (error) console.error("Error fetching data");
      else setShoes(data || []);
      setIsLoading(false);
    };
    dataFetching();
  }, []);

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-gray-900" />
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      <Suspense fallback={<div className="h-screen w-full" />}>
       

        {/* Hero Section - Refined for "Luxury Editorial" feel */}
        <header className="relative h-[85vh] w-full overflow-hidden">
          <div className="absolute inset-0 bg-[url(https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80)] bg-cover bg-center bg-no-repeat transition-transform duration-[2s] hover:scale-105" />
          <div className="absolute inset-0 bg-black/30" />{" "}
          {/* Overlay for text readability */}
          <div className="relative flex h-full flex-col justify-center px-8 lg:px-20">
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-3xl text-5xl font-extrabold leading-[1.1] tracking-tight text-white lg:text-8xl"
            >
              The Next Generation of Style.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="mt-6 text-xl text-gray-200 lg:text-2xl"
            >
              Curated sneakers and apparel from{" "}
              <span className="font-semibold text-white">Jaha</span>.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
            >
              <Link
                to="/cart"
                className="mt-10 inline-block rounded-full bg-white px-10 py-4 font-semibold text-gray-900 transition-all hover:bg-gray-100 hover:px-12 active:scale-95"
              >
                Explore Collection
              </Link>
            </motion.div>
          </div>
        </header>
      <Carousel slides = {mockSlides} autoSlide={true} autoSlideInterval={3000} />

        {/* Product Grid - Improved Spacing */}
        <main className="mx-auto max-w-7xl px-4 py-20 lg:px-8">
          <div className="mb-12 flex items-baseline justify-between">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">
              Featured
            </h2>
            <span className="text-sm text-gray-400 uppercase tracking-widest">
              ({shoes.length} Items)
            </span>
          </div>


          <ul className="grid grid-cols-2 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {shoes.length > 0 ? (
              shoes.map((product) => (
                <motion.li
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <CustomProductHook
                    product={product}
                    tableName="homepage_shoes"
                  />
                </motion.li>
              ))
            ) : (
              <p className="col-span-full text-center text-gray-400">
                No products found.
              </p>
            )}
          </ul>
        </main>
      </Suspense>
    
    </div>

  );
}

export default App;
