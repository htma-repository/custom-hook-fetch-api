import { useState, useCallback } from "react";

const useFetch = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const requestHttp = useCallback(async (requestConf, requestFunc) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(requestConf.url, {
        method: requestConf.method ? requestConf.method : "GET",
        headers: requestConf.headers ? requestConf.headers : {},
        body: requestConf.body ? JSON.stringify(requestConf.body) : null,
      });

      if (!response.ok) {
        throw new Error("Request failed!");
      }

      const data = await response.json();

      requestFunc(data);
    } catch (err) {
      setError(err.message || "Something went wrong!");
    }
    setIsLoading(false);
  }, []);

  return { isLoading, error, requestHttp };
};

export default useFetch;
