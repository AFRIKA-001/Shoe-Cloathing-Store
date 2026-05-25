










import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import CartContext from './store/cartContext';
import toast from 'react-hot-toast';

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'ksh',
});

function CustomProductHook({ product, tableName }) {
  const cartContext = useContext(CartContext);
  const [addedToCart, setAddedToCart] = useState(false);

  function addToCart() {
    if (!addedToCart) {
      cartContext.AddItems(product);

      toast.success(`${product.name}added to cart`)
    } else {
      cartContext.RemoveItems(product.id);

      toast.error(`${product.name} removed from cart`);
    }

    setAddedToCart((prev) => !prev);
  }

  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      
      <Link
        to={`/products/${tableName}/${product.id}`}
        className="flex flex-col"
      >
        <div className="overflow-hidden rounded-t-2xl bg-gray-100">
          <img
            src={product.image}
            alt={product.name}
            className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-105 lg:h-72"
          />
        </div>

        <div className="flex flex-col gap-2 p-4">
          <h2 className="line-clamp-1 text-base font-semibold tracking-tight text-gray-900 lg:text-lg">
            {product.name}
          </h2>

          <p className="text-sm font-medium text-gray-500">
            Size: <span className="text-gray-700">{product.size}</span>
          </p>

          <p className="text-lg font-bold tracking-tight text-gray-900">
            {formatter.format(product.price)}
          </p>
        </div>
      </Link>

      <div className="px-4 pb-4">
        <button
          onClick={addToCart}
          className={`w-full rounded-xl py-3 text-sm font-semibold transition-all duration-300 active:scale-95 ${
            addedToCart
              ? 'bg-green-100 text-green-700 hover:bg-green-200'
              : 'bg-black text-white hover:bg-gray-800'
          }`}
        >
          {addedToCart ? (
            <span className="flex items-center justify-center gap-2">
              Added to Cart
              <span>✓</span>
            </span>
          ) : (
            <span className="flex items-center justify-center gap-2">
              Add to Cart
              {/* <span className="text-lg">+</span> */}
            </span>
          )}
        </button>
      </div>
    </div>
  );
}

export default CustomProductHook;







// import { useContext,useState } from 'react';
// import { Link } from 'react-router-dom'
// import CartContext from './store/cartContext';

// const formatter = new Intl.NumberFormat('en-US', {
//     style: 'currency',
//     currency: "ksh",
// })



// function CustomProductHook({ product,tableName }) {
//     const cartContext = useContext(CartContext)
//     const [addedToCart, setAddedToCart] = useState(false);

//     function addToCart(){
//         if(!addedToCart){
//         cartContext.AddItems(product)
//         }else{
//         cartContext.RemoveItems(product.id)
//         }
//         setAddedToCart((prev) => !prev);
//     }
//     return (
//         <div className='flex flex-col items-center gap-4'>
//             <Link to={`/products/${tableName}/${product.id}`}>
//                 <img src={product.image} alt={product.name} className="h-48 w-full rounded-lg lg:h-70 object-cover hover:scale-105 hover:shadow-xl transition-shadow duration-300 aspect-video" />
//                 <h2 className="text-gray-800 line-clamp-1 font-sans mt-4 ">{product.name}
//                     <span className="font-sans font-light  text-gray-600 "> size: {product.size}</span>
//                 </h2>
//                 <p className=" tracking-tight text-xs font-sans font-bold lg:text-lg text-gray-800 "> {formatter.format(product.price)}</p>
//             </Link>
//             <button onClick={addToCart} className='border rounded-full w-full p-1 hover:scale-105 bg-black hover:bg-slate-700 text-white transition-all duration-400 active:scale-95'>
//                 {addedToCart ? <p className='text-green-500'>Added to Cart<span className="pl-1 text-green-500">✓</span></p> : 'Add to Cart'}
//                 {/* {!addedToCart && <span className="pl-1">+</span>} */}
//                 </button>
//         </div>
//     )
// }

// export default CustomProductHook;
