import { useContext, useRef, useState } from "react";
import Input from "./Logins/CustomInput";
import CartContext from "../../store/cartContext";
import Footer from "./footer";
import { Link } from "react-router-dom"; // Added useNavigate
import { ArrowLeft, Loader2 } from "lucide-react"; // Added Loader icon
import { supabase } from "../../store/supabaseClient"; // Ensure this import exists
import toast from "react-hot-toast";

const CheckOut = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const cartCtxt = useContext(CartContext);
  const formRef = useRef();
  // const navigate = useNavigate();

  const totalPrice = cartCtxt.items.reduce((total, item) => total + item.price * item.quantity, 0);
  const totalItems = cartCtxt.items.reduce((total, item) => total + item.quantity, 0);

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "KSH",
  });

  // --- MPESA INTEGRATION LOGIC ---
  const handlePayment = async (phone, amount) => {
    // Sanitize phone number to 254... format
    const cleanPhone = phone.startsWith('0') ? `254${phone.slice(1)}` : phone.replace('+', '');
    
    const { data, error } = await supabase.functions.invoke('mpesa-push', {
      body: { 
        amount: Math.floor(amount), 
        phone: cleanPhone, 
        // orderId: `JAHA${Math.floor(Math.random() * 1000)}` // Temporary Order ID logic
      }
    });

    if (error || data?.ResponseCode !== "0") {
      toast.error("M-Pesa request failed. Please check your number and try again.");
      return false;
    }
    return true;
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setIsProcessing(true);

    const fd = new FormData(e.target);
    const customerData = Object.fromEntries(fd.entries());
    
    // 1. Trigger M-Pesa
    const paymentTriggered = await handlePayment(customerData.phone, totalPrice);

    if (paymentTriggered) {
      // 2. Clear Cart and Reset
      cartCtxt.ClearCart();
      alert("Check your phone for the M-Pesa PIN prompt!");
      // navigate("/success"); // Optional: redirect to a thank you page
    }

    setIsProcessing(false);
  }

  return (
    <>
      <form ref={formRef} onSubmit={handleSubmit}>
        <div className="min-h-screen bg-white pt-20 pb-2 px-4 ">
          <div className="max-w-6xl mx-auto">
            <header className="mb-12 text-center">
              <h1 className="text-4xl font-extrabold tracking-tighter uppercase text-black">Checkout</h1>
              <p className="text-gray-500 text-sm mt-2 font-medium tracking-wide">Finalize your JAHA collection order</p>
            </header>

            {/* Cleaned up Go Back Link */}
            <Link to="/" className="inline-flex items-center text-gray-400 md:text-lg pb-4 hover:text-black transition-all">
              <ArrowLeft className="mr-2" size={20} /> go back to homepage
            </Link>

            <div className="grid lg:grid-cols-2 gap-16">
              {/* Shipping Details */}
              <div>
                <section>
                  <h2 className="text-lg font-bold uppercase tracking-widest mb-6 border-b pb-2">01. Shipping Details</h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                      <Input name="fullname" label="Full Name" placeholder="Gabriel Shikuku" required />
                    </div>
                    <Input name="email" label="Email Address" type="email" placeholder="shikuku@example.com" required />
                    {/* Added 'name' attribute so FormData can pick it up */}
                    <Input name="phone" label="Phone Number" type="tel" placeholder="0712345678" required />
                    <div className="md:col-span-2">
                      <Input name="address" label="Shipping Address" placeholder="Street, House No, Apartment" required />
                    </div>
                    <Input name="city" label="City" placeholder="Nairobi" required />
                    <Input name="postal" label="Postal Code" placeholder="00100" required />
                  </div>
                </section>
              </div>

              {/* Order Summary */}
              <div>
                <div className="bg-gray-50 p-8 rounded-3xl sticky top-24">
                  <h2 className="text-lg font-bold uppercase tracking-widest mb-6">Order Summary</h2>
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

                  {totalItems > 0 ? (
                    <button 
                      type="submit" 
                      disabled={isProcessing}
                      className="w-full py-5 bg-black text-white rounded-full font-bold uppercase tracking-[0.2em] hover:bg-gray-800 transition-all shadow-xl active:scale-95 disabled:bg-gray-400 flex justify-center items-center"
                    >
                      {isProcessing ? <Loader2 className="animate-spin mr-2" /> : "Place Order & Pay"}
                    </button>
                  ) : (
                    <Link to="/" className="block text-center w-full py-5 border-2 border-black rounded-full font-bold uppercase tracking-[0.2em] hover:bg-black hover:text-white transition-all">
                      Continue Shopping
                    </Link>
                  )}

                  <p className="text-[10px] text-gray-400 text-center mt-6 uppercase tracking-widest">Secure SSL Encrypted Checkout</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
      <Footer />
    </>
  );
};

export default CheckOut;