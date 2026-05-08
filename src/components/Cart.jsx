import { useContext } from "react";
import { Link } from "react-router-dom";
import CartContext from "../../store/cartContext";
import { Trash2, Plus, Minus, ArrowLeft } from "lucide-react";

function Cart() {
  const { items, AddItems, RemoveItems, ClearCart } = useContext(CartContext);

  // Calculate the total price
  const totalPrice = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

//formatting the price
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "KES",
  });
//when cart is empty 
  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <h2 className="text-2xl font-bold">Your cart is empty</h2>
        <Link to="/" className="bg-black text-white border px-6 py-2 rounded-full flex items-center gap-2">
          <ArrowLeft size={18} /> Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 font-sans">
      <h1 className="text-3xl font-extrabold mb-8">Shopping Bag</h1>

      <div className="space-y-7">
        {items.map((item) => (
          <div key={item.id} className="flex items-center gap-4 border- pb-6">
            <img 
              src={item.image} 
              alt={item.name} 
              className="w-24 h-24 object-cover rounded-lg bg-gray-100" 
            />
            
            <div className="flex-1">
              <h3 className="font-bold text-lg">{item.name}</h3>
              <p className="text-gray-500 text-sm">Size: {item.size}</p>
              <p className="font-mono font-bold mt-1">{formatter.format(item.price)}</p>
            </div>

            <div className="flex items-center border-b border rounded-full px-2 py-1 gap-8">
              <button onClick={() => RemoveItems(item.id)} className="p-1 hover:text-red-600">
                <Minus size={16} />
              </button>
              <span className="font-bold w-4 text-center">{item.quantity}</span>
              <button onClick={() => AddItems(item)} className="p-1 hover:text-green-600">
                <Plus size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 p-6 bg-gray-50 rounded-2xl space-y-4">
        <div className="flex justify-between text-xl font-bold">
          <span>Total</span>
          <span>{formatter.format(totalPrice)}</span>
        </div>
        
        <div className="flex gap-4 pt-4">
          <button 
            onClick={ClearCart}
            className=" flex items-center hover:text-red-600 transition-colors cursor-pointer hover:scale-105 active:scale-95"
          >
            <Trash2/>clear cart
          </button>
          <button className="flex-2 bg-black text-white py-3 rounded-full font-bold hover:bg-gray-800 transition-transform active:scale-95">
            <Link to="/checkout">Checkout</Link>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cart;