import { useContext,useState } from 'react';
import { Link } from 'react-router-dom'
import CartContext from './store/cartContext';

const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: "ksh",
})



function CustomProductHook({ product,tableName }) {
    const cartContext = useContext(CartContext)
    const [addedToCart, setAddedToCart] = useState(false);

    function addToCart(){
        if(!addedToCart){
        cartContext.AddItems(product)
        }else{
        cartContext.RemoveItems(product.id)
        }
        setAddedToCart(!addedToCart);
    }
    return (
        <div className='flex flex-col items-center gap-4'>
            <Link to={`/products/${tableName}/${product.id}`}>
                <img src={product.image} alt={product.name} className="h-48 w-full rounded-lg lg:h-70 object-cover hover:scale-105 hover:shadow-xl transition-shadow duration-300 aspect-video" />
                <h2 className="text-gray-800 line-clamp-1 font-sans mt-4 ">{product.name}
                    <span className="font-sans font-light  text-gray-600 "> size: {product.size}</span>
                </h2>
                <p className=" tracking-tight text-xs font-sans font-bold lg:text-lg text-gray-800 "> {formatter.format(product.price)}</p>
            </Link>
            <button onClick={addToCart} className='border rounded-full w-full p-1 hover:scale-105 bg-black hover:bg-slate-700 text-white transition-all duration-400 active:scale-95'>
                {addedToCart ? <p className='text-green-500'>Added to Cart<span className="pl-1 text-green-500">✓</span></p> : 'Add to Cart'}
                {!addedToCart && <span className="pl-1">+</span>}
                </button>

        </div>
    )
}

export default CustomProductHook;
