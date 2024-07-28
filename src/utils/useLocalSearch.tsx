import { useState, useEffect } from "react";

const useLocalSearch = (key: string, initialValue: string) => {
  const [value, setValue] = useState<string>(() => {
    const savedValue = localStorage.getItem(key);
    return savedValue !== null ? savedValue : initialValue;
  });

  useEffect(() => {
    const handleBeforeUnload = () => {
      localStorage.setItem(key, value);
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      localStorage.setItem(key, value);
    };
  }, [key, value]);

  return [value, setValue] as const;
};

export default useLocalSearch;
