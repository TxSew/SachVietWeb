import { useState } from "react";

function useLoading() {
  const [isLoading, setIsLoading] = useState(false);

  // Function to start loading
  function startLoading() {
    setIsLoading(true);
  }

  // Function to stop loading
  function stopLoading() {
    setIsLoading(false);
  }

  return { isLoading, startLoading, stopLoading };
}
export default useLoading;
