
function CustomProductHook({product}) {
  return (
    <div>
      <img src={product.image} alt={product.name} className="h-70 w-70 object-cover" />
      <h2 className="text-black font-serif">{product.name}
        <span className="font-thin text-gray-600   "> {product.size}</span>
        </h2>   
      <p className="font-bold font-serif text-xl ">KES {product.price}</p>
    </div>
  )
}

export default CustomProductHook;
