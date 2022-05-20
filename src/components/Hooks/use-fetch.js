import { useState } from "react";

const useFetchTask = (fetchRequest, funcTask) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const requestTask = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(fetchRequest.url, {
        method: fetchRequest.method ? fetchRequest.method : "GET",
        body: fetchRequest.body ? JSON.stringify(fetchRequest.body) : {},
        headers: fetchRequest.headers ? fetchRequest.headers : null,
      });

      if (!response.ok) {
        throw new Error("Request failed!");
      }

      const data = await response.json();

      funcTask(data);
    } catch (err) {
      setError(err.message || "Something went wrong!");
    }
    setIsLoading(false);
  };

  return {
    isLoading,
    error,
    requestTask,
  };
};

export default useFetchTask;
