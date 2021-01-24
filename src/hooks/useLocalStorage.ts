import { Dispatch, SetStateAction, useState, useEffect } from "react";

export default function useLocalStorage<T>(key: string) {
  const initialValue = JSON.parse(localStorage.getItem(key) || "");

  const [state, setState] = useState<T>(initialValue);

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  type Result = [T, Dispatch<SetStateAction<T>>];

  const result: Result = [state, setState];

  return result;
}
