import { supabase } from "../../store/supabaseClient"
import CustomProductHook from '../../customProductHook'
import  {useState , useEffect}  from "react"
import { Loader2 } from "lucide-react";

const Mens = ()=> {
  const [shoes,setShoes]=useState([]);
  const [isLoading,setIsLoading]=useState(false)
  // const [error,setError]=useState(null)
  
  useEffect(()=>{
   const shoeFetching = async()=>{
      setIsLoading(true)
    const { data,error } = await supabase
    .from("mens_shoe")
    .select("*");
    if(error){
      console.error("there was an error during fetching")
    }else{
      setShoes(data)
    } 
    setIsLoading(false)
    }
    shoeFetching();
},[])

if(isLoading){
  return <div className="text-red-600 flex justify-center  my-60 animate-spin"><Loader2/></div>
}

  return (
  <>
  <ul className="grid  grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-2">
    {shoes.map((product)=><li key={product.id}>    
    <CustomProductHook product={product} tableName="mens_shoe"/>
    
    </li>)}
     
  </ul>
  </>
  
    )
   
  
}

export default Mens;
