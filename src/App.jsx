
import CustomProductHook from "../customProductHook"
import { useState,useEffect } from "react"
import { supabase } from "../store/supabaseClient";
import { Loader2 } from "lucide-react";


function App() {
  const [shoes,setShoes] = useState([]);
  const [isLoading,setIsLoading] = useState(false);

  useEffect(()=>{
    const dataFetching = async ()=>{
      setIsLoading(true)
      const {data,error} = await supabase.from('homepage_shoes').select('*');
      if(error){
        console.error("an error occurred during fetching")
      }else{
        setShoes(data);
      }
      setIsLoading(false)
    } 
    dataFetching();
  },[])


if(isLoading){
  return  <div className="text-red-600 text-2xl flex justify-center my-60 animate-spin"><Loader2/></div>
}

  return (
    <>
    
    <div className=" flex flex-col bg-[url(https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=60&w=900)] bg-cover bg-center bg-no-repeat h-screen  w-full">
    <h1 className="text-4xl  lg:text-7xl font-bold tracking-tight text-white leading-snug ">Have your Next generation aspects of fashion</h1>
    <p className="text-2xl text-gray-400">treat yourself with sneakers from Jaha</p>
    <button className="flex border-white font-bold bg-white  justify-start mt-20 max-w-60 border ml-6 mx-auto p-2 px-8 rounded-xl  hover:bg-gray-400 transition-all transform hover:scale-105 active:scale-95">shop now</button>
    </div>

    <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4 justify-items-center ">
      {shoes.map(product => <li key={product.id}>
        <CustomProductHook  product={product} />
      </li>)}
    </ul>
    
    </>
    
  )
}

export default App
