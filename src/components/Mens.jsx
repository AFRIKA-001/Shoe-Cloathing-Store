import { supabase } from "../../store/supabaseClient"
import CustomProductHook from '../../customProductHook'
import  {useState , useEffect}  from "react"

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
  return <div>loading...</div>
}

  return (
  <>
  <ul className="grid grid-cols-4">
    {shoes.map((product)=><li key={product.id}>    
    <CustomProductHook product={product}/>
    
    </li>)}
     
  </ul>
  </>
  
    )
   
  
}

export default Mens;
