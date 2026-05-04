import { supabase } from "../../store/supabaseClient"
import CustomProductHook from '../../customProductHook'
import  {useState , useEffect}  from "react"
import { Loader2 } from "lucide-react";


function Kids() {
const [shoes,setShoes] = useState([]);
const [isLoading, setIsLoading]=useState(false);


  useEffect(()=>{
    const KidsDataFetching = async () => {
      setIsLoading(true)

      const {data,error:supabaseError}= await supabase.from('kids_table').select('*');
      if(supabaseError){
        return supabaseError;
      }else{
        setShoes(data)
      }
      setIsLoading(false)
    }
    KidsDataFetching();
  },[])
  if(isLoading){
    return <div className="text-red-600 flex justify-center my-60 animate-spin  "><Loader2/></div>
  }
  return (
    <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-2">
      {shoes.map(product=><li key={product.id}>
        <CustomProductHook product={product}/>
      </li>)}
    </ul>
  )
}

export default Kids
