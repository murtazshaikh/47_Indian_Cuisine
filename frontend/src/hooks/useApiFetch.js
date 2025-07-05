import { useState, useEffect, useCallback } from "react";

export default function useApiFetch(initialUrl = "", options = {}) {
  const [url, setUrl] = useState(initialUrl);
  const [fetchOptions, setFetchOptions] = useState(options);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchData = useCallback(async () => {
    if (!url) return;

    try {
      setLoading(true);
      setError("");
      const res = await fetch(url, fetchOptions);
      if (!res.ok) throw new Error("Failed to fetch data");
      const result = await res.json();
      setData(result);
    } catch (err) {
      setError(err.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  }, [url, fetchOptions]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, setUrl, setFetchOptions, refetch: fetchData };
}
