import { supabase } from "../../store/supabaseClient";
import { useState, useEffect, lazy, Suspense } from "react";
import { Loader, Loader2 } from "lucide-react";
const CustomProductHook = lazy(() => import("../../customProductHook"));

function New() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const newArrivalDataFetching = async () => {
      setIsLoading(true);
      const { data, error } = await supabase
        .from("newarrivals_table")
        .select("*");
      if (error) {
        console.error("There was an error fetching data from supabase");
      } else {
        setData(data || []);
      }
      setIsLoading(false);
    };
    newArrivalDataFetching();
  }, []);

  if (isLoading) {
    return (
      <div className="text-red-600 flex justify-center my-60 animate-spin">
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
        <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
          {data.map((product) => (
            <li key={product.id}>
              <CustomProductHook
                product={product}
                tableName="newarrivals_table"
              />
            </li>
          ))}
        </ul>
      </Suspense>
    </>
  );
}

export default New;
