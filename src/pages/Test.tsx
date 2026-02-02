import { useEffect, useState } from "react";
import supabase from "../services/supabase";

function Test() {
  const [data, setData] = useState<Record<string, unknown>[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, error } = await supabase
          .from("members")
          .select("*")
          .eq("autorizated", true);
        if (error) {
          setError(error.message);
        } else {
          setData(data);
        }
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unexpected error occurred",
        );
      }
    };
    fetchData();
  }, []);

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h1>Test Page - Members Data</h1>
      {data && data.length === 0 ? (
        <p>No members found.</p>
      ) : (
        data?.map((item) => {
          return (
            <div key={item.id as string}>
              <p>Nombre: {item.name as string}</p>
              <p>Ciudad: {item.city as string}</p>
              <p>Mensaje: {item.message as string}</p>
              <img
                className="rounded-full h-30 w-30 object-cover "
                src={item.picture_url as string}
                alt={item.name as string}
              />
              <hr />
            </div>
          );
        })
      )}
    </div>
  );
}

export default Test;
