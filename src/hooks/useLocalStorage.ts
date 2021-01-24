import { useEffect } from "react";

export default function useLocalStorage(key: string, value: string) {
  useEffect(() => {
    localStorage.setItem(key, value);
  }, [key, value]);
}
