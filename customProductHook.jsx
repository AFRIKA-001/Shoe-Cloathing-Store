import { Link } from 'react-router-dom'
const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: "kes",
})



function CustomProductHook({ product }) {
    return (
        <div>
            <Link to={`/:id${product.id}`}>
                <img src={product.image} alt={product.name} className="h-48 w-full lg:h-70 object-cover hover:scale-105 hover:shadow-xl transition-shadow duration-300 aspect-video" />
                <h2 className="text-gray-800 line-clamp-2 font-sans mt-4 ">{product.name}
                    <span className="font-sans font-light  text-gray-600 "> size: {product.size}</span>
                </h2>
                <p className=" tracking-tight text-xs font-sans font-bold lg:text-lg text-gray-800 "> {formatter.format(product.price)}</p>
            </Link>

        </div>
    )
}

export default CustomProductHook;
