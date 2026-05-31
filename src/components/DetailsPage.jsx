import { Loader2, ShieldCheckIcon } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { supabase } from "../../store/supabaseClient";
import CartContext from "../../store/cartContext";
import toast from "react-hot-toast";

function DetailsPage() {
  const { category, productid } = useParams();

  const navigate = useNavigate();
  const [product, setProduct] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const { AddItems } = useContext(CartContext);

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "KES",
  });

  const totalItems = useContext(CartContext).items.reduce((total, item) => {
    return total + item.quantity;
  }, 0);

  useEffect(() => {
    const dataFetching = async () => {
      try {
        setIsLoading(true);

        const { data, error } = await supabase
          .from(category)
          .select("*")
          .eq("id", productid)
          .single();

        if (error) throw error;

        setProduct(data);
      } catch (err) {
        console.error("error fetching data from :", category, err);
      } finally {
        setIsLoading(false);
      }
    };

    if (category && productid) dataFetching();
  }, [productid, category]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[70vh]">
        <Loader2
          size={40}
          className="animate-spin text-black"
        />
      </div>
    );
  }

  if (!product) {
    return (
      <p className="text-center mt-20 text-lg text-gray-500">
        There was no product found.
      </p>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16">
      {/* Back Navigation */}
      <button
        onClick={() => navigate(-1)}
        className="group mb-10 flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-black transition-all duration-300"
      >
        <span className="transition-transform duration-300 group-hover:-translate-x-1">
          ←
        </span>
        Back to Collection
      </button>

      {/* Main Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-24">
        {/* Product Image */}
        <div className="relative overflow-hidden rounded-3xl bg-gray-100 shadow-xl">
          <div className="absolute top-5 left-5 z-10">
            <span className="rounded-full bg-white/90 backdrop-blur-md px-4 py-2 text-xs font-semibold shadow-md">
              Premium Collection
            </span>
          </div>

          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
          />
        </div>

        {/* Product Details */}
        <div className="flex flex-col justify-center space-y-8">
          {/* Category + Name */}
          <div className="space-y-4">
            <div className="inline-flex rounded-full bg-gray-100 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-gray-500">
              {category.replace("_", " ")}
            </div>

            <h1 className="text-4xl md:text-5xl xl:text-6xl font-black tracking-tight text-gray-900 leading-tight">
              {product.name}
            </h1>

            <p className="text-gray-500 text-lg">
              Size: <span className="font-semibold">{product.size}</span>
            </p>
          </div>

          {/* Price */}
          <div className="flex flex-wrap items-center gap-4">
            <h2 className="text-4xl font-black text-gray-900">
              {formatter.format(product.price)}
            </h2>

            <span className="rounded-full bg-green-100 text-green-700 px-4 py-2 text-sm font-semibold">
              ✓ In Stock
            </span>
          </div>

          {/* Description */}
          <div className="rounded-3xl border border-gray-200 bg-gray-50 p-6">
            <p className="leading-8 text-gray-600">
              {product.description ||
                "Crafted with premium materials for ultimate comfort and style. A timeless piece for your wardrobe from JAHA."}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4">
            <button
              onClick={() => {
                AddItems(product);

                toast.success(`${product.name} added to cart ✓`, {
                  duration: 2000,
                  style: {
                    borderRadius: "16px",
                    background: "#111827",
                    color: "#fff",
                  },
                });
              }}
              className="
                w-full
                cursor-pointer
                rounded-2xl
                bg-black
                py-5
                text-sm
                font-bold
                uppercase
                tracking-[0.2em]
                text-white
                shadow-xl
                transition-all
                duration-300
                hover:-translate-y-1
                hover:shadow-2xl
                active:scale-95
              "
            >
              Add to Cart
            </button>

            {product && (
              <Link
                to="/cart"
                className="
                  flex
                  justify-center
                  items-center
                  w-full
                  rounded-2xl
                  border
                  border-gray-300
                  bg-white
                  py-4
                  font-semibold
                  transition-all
                  duration-300
                  hover:border-black
                  hover:bg-black
                  hover:text-white
                  active:scale-95
                "
              >
                View Cart
              </Link>
            )}

            {totalItems > 0 && (
              <Link
                to="/checkout"
                className="
                  flex
                  justify-center
                  items-center
                  w-full
                  rounded-2xl
                  border
                  border-gray-300
                  bg-white
                  py-4
                  font-semibold
                  transition-all
                  duration-300
                  hover:border-black
                  hover:bg-black
                  hover:text-white
                  active:scale-95
                "
              >
                Proceed to Checkout
              </Link>
            )}
          </div>

          {/* Trust Badges */}
          <div className="grid grid-cols-3 gap-4 pt-10">
            <div className="rounded-2xl border border-gray-200 p-4 text-center hover:shadow-lg transition-all">
              <p className="text-2xl">🚚</p>
              <p className="mt-2 text-xs font-semibold uppercase text-gray-500">
                Free Delivery
              </p>
            </div>

            <div className="rounded-2xl border border-gray-200 p-4 text-center hover:shadow-lg transition-all">
              <p className="text-2xl">🔄</p>
              <p className="mt-2 text-xs font-semibold uppercase text-gray-500">
                Easy Returns
              </p>
            </div>

            <div className="rounded-2xl border border-gray-200 p-4 text-center hover:shadow-lg transition-all">
              <ShieldCheckIcon
                size={28}
                className="mx-auto text-green-600"
              />
              <p className="mt-2 text-xs font-semibold uppercase text-gray-500">
                Secure Payment
              </p>
            </div>
          </div>

          {/* Extra Premium Features */}
          <div className="rounded-3xl bg-black text-white p-6 mt-4">
            <h3 className="font-bold text-lg mb-3">
              Why customers love this product
            </h3>

            <ul className="space-y-2 text-sm text-gray-300">
              <li>✓ Premium quality materials</li>
              <li>✓ Comfortable all-day wear</li>
              <li>✓ Modern and timeless design</li>
              <li>✓ Fast nationwide delivery</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailsPage;

