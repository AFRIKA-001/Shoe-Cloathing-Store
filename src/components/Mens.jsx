import { supabase } from "../../store/supabaseClient";
import { useState, useEffect, lazy, Suspense } from "react";
import { Loader2, Loader } from "lucide-react";
const CustomProductHook = lazy(() => import("../../customProductHook"));

const Mens = () => {
  const [shoes, setShoes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  // const [error,setError]=useState(null)

  useEffect(() => {
    const shoeFetching = async () => {
      setIsLoading(true);
      const { data, error } = await supabase.from("mens_shoe").select("*");
      if (error) {
        console.error("there was an error during fetching");
      } else {
        setShoes(data);
        // console.log(data)
      }
      setIsLoading(false);
    };
    shoeFetching();
  }, []);

  if (isLoading) {
    return (
      <div className="text-red-600 flex justify-center  my-60 animate-spin">
        <Loader2 />
      </div>
    );
  }

  return (
    <>
      <Suspense
        fallback={
          <div className="flex justify-center my-60">
            <Loader className="text-red-600 animate-spin" />
          </div>
        }
      >
        <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4  mt-2">
          {shoes.map((product) => (
            <li key={product.id}>
              <CustomProductHook product={product} tableName="mens_shoe" />
            </li>
          ))}
        </ul>
      </Suspense>
    </>
  );
};

export default Mens;
