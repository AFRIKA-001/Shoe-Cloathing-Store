import { Link } from 'react-router-dom'
const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: "ksh",
})



function CustomProductHook({ product }) {
    return (
        <div>
            <Link to={`/:id${product.id}`}>
                <img src={product.image} alt={product.name} className="h-70 w-85 lg:w-70 object-cover hover:scale-105" />
                <h2 className="text-black font-serif">{product.name}
                    <span className="font-thin text-gray-600 "> {product.size}</span>
                </h2>
                <p className="font-bold font-serif text-xl "> {formatter.format(product.price)}</p>
            </Link>

        </div>
    )
}

export default CustomProductHook;
