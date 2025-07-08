import { useState, useEffect } from "react";

/**
 * Custom hook to fetch data from an API endpoint.
 * @param {Function} apiFn - The API function to call (should return a promise).
 * @param {Array} deps - Dependency array for useEffect.
 * @returns {[any, boolean, any]} [data, loading, error]
 */
export function useFetch(apiFn, deps = []) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    apiFn()
      .then((result) => {
        if (isMounted) {
          setData(result);
          setError(null);
        }
      })
      .catch((err) => {
        if (isMounted) setError(err);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });
    return () => {
      isMounted = false;
    };
  }, deps);

  return [data, loading, error];
}