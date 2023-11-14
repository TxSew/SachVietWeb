import { useState } from "react";

function useLoading() {
  const [isLoading, setIsLoading] = useState(false);

  function startLoading() {
    setIsLoading(true);
  }

  function stopLoading() {
    setIsLoading(false);
  }

  return { isLoading, startLoading, stopLoading };
}
export default useLoading;
