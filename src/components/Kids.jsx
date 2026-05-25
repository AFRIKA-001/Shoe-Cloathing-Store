import { supabase } from "../../store/supabaseClient";
import { useState, useEffect, lazy, Suspense } from "react";
import { Loader, Loader2 } from "lucide-react";
const CustomProductHook = lazy(() => import("../../customProductHook"));

function Kids() {
  const [shoes, setShoes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const KidsDataFetching = async () => {
      setIsLoading(true);

      const { data, error: supabaseError } = await supabase
        .from("kids_table")
        .select("*");
      if (supabaseError) {
        return supabaseError;
      } else {
        setShoes(data);
      }
      setIsLoading(false);
    };
    KidsDataFetching();
  }, []);
  if (isLoading) {
    return (
      <div className="text-red-600 flex justify-center my-60 animate-spin  ">
        <Loader2 />
      </div>
    );
  }
  return (
    <>
      <Suspense
        fallback={
          <div className="flex justify-center py-60">
            <Loader className="animate-spin text-gray" />
          </div>
        }
      >
        <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-2">
          {shoes.map((product) => (
            <li key={product.id}>
              <CustomProductHook product={product} tableName="kids_table" />
            </li>
          ))}
        </ul>
      </Suspense>
    </>
  );
}

export default Kids;
