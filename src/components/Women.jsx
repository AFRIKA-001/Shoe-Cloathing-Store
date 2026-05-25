import { supabase } from "../../store/supabaseClient";
import { useState, useEffect, lazy, Suspense } from "react";
import { Loader2, Loader } from "lucide-react";

const CustomProductHook = lazy(() => import("../../customProductHook"));

function Women() {
  const [shoes, setShoes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  // const [error,setError]=useState(null)

  useEffect(() => {
    const shoeFetching = async () => {
      setIsLoading(true);
      const { data, error } = await supabase.from("women_shoes").select("*");
      if (error) {
        console.error("there was an error during fetching");
      } else {
        setShoes(data);
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
            <Loader className="animate-spin text-red-600" />
          </div>
        }
      >
        <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
          {shoes.map((product) => (
            <li key={product.id}>
              <CustomProductHook product={product} tableName="women_shoes" />
            </li>
          ))}
        </ul>
      </Suspense>
    </>
  );
}

export default Women;
