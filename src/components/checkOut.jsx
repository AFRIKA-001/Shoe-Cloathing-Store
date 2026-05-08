 import { useContext,useRef,useState} from "react";
import Input from "./Logins/CustomInput";
import CartContext from "../../store/cartContext";
import Footer from "./footer";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";


const CheckOut = () => {

  const [submitOrder, setSubmitorder] = useState(false);
 const cartCtxt = useContext(CartContext);

  const totalPrice = cartCtxt.items.reduce((total,item)=> {
 return total + item.price * item.quantity 
  },0)

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "KES",
  });
const formRef = useRef();
  function handleSubmit(e){
    e.preventDefault();
    setSubmitorder(true);
    const fd = new FormData(e.target);
    const data = Object.fromEntries(fd.entries());
    console.log(data)
     cartCtxt.ClearCart();
 if(formRef){
    formRef.current.reset();
 }


  }
  return (
    <>
    <form ref={formRef} onSubmit={handleSubmit} >
    
    <div className="min-h-screen bg-white pt-20 pb-2 px-4 ">
      <div className="max-w-6xl mx-auto">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-extrabold tracking-tighter uppercase text-black">
            Checkout
          </h1>
          <p className="text-gray-500 text-sm mt-2 font-medium tracking-wide">
            Finalize your JAHA collection order
          </p>
        </header>
        <button  type="submit"><Link to="/" className="flex items-center text-gray-400 md:text-lg pb-4 hover:text-black hover:scale-105 active-[0.9]"><ArrowLeft />go back to hompage</Link></button>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left Column: Shipping & Payment */}
          <div >
            
            <section>
              <h2 className="text-lg font-bold uppercase tracking-widest mb-6 border-b pb-2">
                01. Shipping Details
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <Input label="Full Name" placeholder="Gabriel Shikuku" />
                </div>
                <Input label="Email Address" type="email" placeholder="shikuku@example.com" />
                <Input label="Phone Number" type="tel" placeholder="+254..." />
                <div className="md:col-span-2">
                  <Input label="Shipping Address" placeholder="Street, House No, Apartment" />
                </div>
                <Input label="City" placeholder="Nairobi" />
                <Input label="Postal Code" placeholder="00100" />
              </div>
            </section>
          </div>

          {/* Right Column: Order Summary */}
          <div >
            <div className="bg-gray-50 p-8 rounded-3xl sticky top-24">
              <h2 className="text-lg font-bold uppercase tracking-widest mb-6">
                Order Summary
              </h2>
              
              {/* This is where you'd map your cart items */}
              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Subtotal</span>
                  <span className="font-bold">{formatter.format(totalPrice)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Shipping</span>
                  <span className="text-green-600 font-bold uppercase text-[10px] tracking-tighter">Free</span>
                </div>
                <div className="border-t pt-4 flex justify-between items-center">
                  <span className="text-base font-bold uppercase tracking-widest">Total</span>
                  <span className="text-2xl font-black">{formatter.format(totalPrice)}</span>
                </div>
              </div>

              <button className="w-full py-5 bg-black text-white rounded-full font-bold uppercase tracking-[0.2em] hover:bg-gray-800 transition-all shadow-xl active:scale-95">
                Submit Order
                   
              </button>
              {submitOrder && alert("Order submitted successfully! Thank you for shopping with JAHA. Your order is being processed.")}
          

              <p className="text-[10px] text-gray-400 text-center mt-6 uppercase tracking-widest">
                Secure SSL Encrypted Checkout
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
    </form>
    <Footer/>
    </>
  );
};

export default CheckOut;