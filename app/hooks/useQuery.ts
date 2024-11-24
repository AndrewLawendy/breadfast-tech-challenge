import { useEffect, useState } from "react";

export function useQuery<T>(key: string | number, fetcher: () => Promise<T>) {
  const [data, setData] = useState<T>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>();

  useEffect(() => {
    setIsLoading(true);

    fetcher()
      .then(setData)
      .catch((error) => setError(error.message))
      .finally(() => setIsLoading(false));
  }, [key]);

  return { data, isLoading, error };
}
