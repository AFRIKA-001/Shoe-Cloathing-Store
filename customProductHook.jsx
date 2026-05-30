

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
      toast.success(`${product.name} added to cart`);
    } else {
      cartContext.RemoveItems(product.id);
      toast.error(`${product.name} removed from cart`);
    }
    setAddedToCart((prev) => !prev);
  }

  return (
    <div className="group flex flex-col overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-[0_4px_20px_rgba(0,0,0,0.05)] transition-all duration-500 hover:shadow-[0_20px_40px_rgba(0,0,0,0.1)] ">
      
      <Link
        to={`/products/${tableName}/${product.id}`}
        className="flex flex-col"
      >
        {/* Image Container with subtle zoom effect */}
        <div className="relative overflow-hidden bg-gray-50">
          <img
            src={product.image}
            alt={product.name}
            loading='lazy'
            className="md:h-72 md:w-72 h-60 w-60 object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          {/* Subtle overlay gradient for better text readability if needed */}
          <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/5" />
        </div>

        <div className="flex flex-col gap-1.5 p-6">
          <h2 className="text-lg font-medium tracking-tight text-gray-900 line-clamp-1">
            {product.name}
          </h2>

          <div className="flex  items-center justify-between">
            <p className="text-sm text-gray-500 uppercase tracking-widest font-medium">
              {product.size}
            </p>
            <p className="text-lg font-semibold text-gray-900 tracking-tight">
              {formatter.format(product.price)}
            </p>
          </div>
        </div>
      </Link>

      <div className="px-6 pb-6 pt-2">
        <button
          onClick={addToCart}
          className={`w-full rounded-2xl py-3.5 text-sm font-medium transition-all duration-300 active:scale-[0.98] ${
            addedToCart
              ? 'bg-gray-300 text-gray-900 border border-gray-200'
              : 'bg-gray-900 text-white hover:bg-black shadow-lg hover:shadow-gray-400/20'
          }`}
        >
          {addedToCart ? (
            <span className="flex items-center justify-center gap-2">
              Added to Cart <span className="text-green-600">✓</span>
            </span>
          ) : (
            'Add to Cart'
          )}
        </button>
      </div>
    </div>
  );
}

export default CustomProductHook;
