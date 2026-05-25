import { Loader2,ShieldCheckIcon} from "lucide-react"
import { useContext, useEffect, useState } from "react"
import { useNavigate, useParams ,Link} from "react-router-dom"
import { supabase } from "../../store/supabaseClient"
import CartContext from "../../store/cartContext"
import toast from "react-hot-toast"


function DetailsPage() {
  const {category,productid}=useParams()

  const navigate = useNavigate()
  const[product,setProduct] = useState()
  const[isLoading,setIsLoading]=useState(false)
  const {AddItems} = useContext(CartContext)

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: "ksh",
})
const totalItems = useContext(CartContext).items.reduce((total,item)=>{
  return total + item.quantity;
},0)




  useEffect(()=>{
const dataFetching = async () => {
  try{
    setIsLoading(true)
    const {data,error } = await supabase.from(category).select('*').eq('id',productid).single()
    if(error) throw error;
   setProduct(data)
   
  }

  catch(err){console.error("error fetching data from :",category ,err)
    
  }
  finally{
    setIsLoading(false)
  }
}
if(category && productid) dataFetching();

  },[productid,category])

 if(isLoading){
  return <div className="flex justify-center my-60 text-red-600 animate-spin"><Loader2/></div>
 }
if(!product){
  return <p className="text-center mt-6">There was no product found</p>
}

  return (
      <div className="max-w-7xl mx-auto px-4 py-8 md:py-16 font-sans">
      {/* Back Navigation */}
      <button 
        onClick={() => navigate(-1)}
        className="group cursor-pointer mb-8 flex items-center text-sm font-medium text-gray-500 hover:text-black transition-colors"
      >
        <span className=" mr-2 transition-transform group-hover:-translate-x-1">←</span>
        Back to Collection
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2  gap-12 lg:gap-24">
        {/* Left: Product Image */}
        <div className="overflow-hidden rounded-xl bg-gray-50">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-auto object-cover hover:scale-105 transition-transform duration-700"
          />
        </div>

        {/* Right: Product Info */}
        <div className="flex flex-col justify-center space-y-6">
          <div>
            {/* <span className="text-xs uppercase tracking-widest text-gray-400 font-bold">
              {category.replace('_', ' ')}
            </span> */}
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mt-2">
              {product.name}
            </h1>
            <p className="text-lg font-mono text-gray-400  pt-4 font-light"> size {product.size}</p>
          </div>

          <div className="flex items-center space-x-4">
            <p className="text-3xl font-light text-gray-900">
              {(formatter.format(product.price))}
            </p>
            <span className="px-2 py-1 bg-green-50 text-green-700 text-xs font-bold rounded">
              In Stock
            </span>
          </div>
          
          <p className="text-gray-600 leading-relaxed text-lg border-t border-b py-6">
            {product.description || "Crafted with premium materials for ultimate comfort and style. A timeless piece for your wardrobe from JAHA."}
          </p>

          <div className="pt-4 space-y-4">

          <button
  onClick={() => {
    AddItems(product);

    toast.success(`${product.name} added to cart ✓`, {
      duration: 2000,
      style: {
        borderRadius: '14px',
        background: '#111827',
        color: '#fff',
        padding: '14px 18px',
        fontWeight: '600',
      },
    });
  }}
  className="w-full cursor-pointer rounded-2xl bg-black py-4 font-bold uppercase tracking-wider text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-gray-800 hover:shadow-2xl active:scale-95"
>
  Add to Cart
</button>
            {/* <button onClick={()=>AddItems(product) } className="w-full bg-black cursor-pointer text-white py-4 rounded-full font-bold uppercase tracking-wider hover:bg-gray-800 transition-all active:scale-95 shadow-lg">
              Add to Cart
            </button>
            { totalItems =>1  && toast.success("added to cart")} */}

            {product && <button className="w-full border cursor-pointer border-gray-300 py-4 rounded-full font-bold uppercase tracking-wider hover:bg-gray-100 active:scale-95 transition-all">
              <Link to="/cart">View Cart</Link>
            </button>}
            {totalItems > 0 &&
            <button className="w-full border cursor-pointer border-gray-300 py-4 rounded-full font-bold uppercase tracking-wider hover:bg-gray-100 active:scale-95 transition-all">
              <Link to="/checkout">Proceed to Checkout</Link>
            </button>
            }
          </div>

          {/* Trust Badges */}
          <div className="grid grid-cols-3 gap-4 pt-8 text-center text-[10px] uppercase tracking-tighter text-gray-400">
            <div className="flex flex-col items-center">
              <span>🚚 Free Delivery</span>
            </div>
            <div className="flex flex-col items-center">
              <span>🔄 30-Day Returns</span>
            </div>
            <div className="flex flex-col items-center">
              <span><ShieldCheckIcon size={24}/> Secure Payment</span>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
}
export default DetailsPage