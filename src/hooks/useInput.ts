import { useState, ChangeEvent, Dispatch, SetStateAction } from "react";

type Result = [
  string,
  Dispatch<SetStateAction<string>>,
  {
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  }
];

export default function useInput(initialValue = "") {
  const [state, setState] = useState(initialValue);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setState(e.target.value);
  };

  const bindState = { value: state, onChange: handleChange };

  const result: Result = [state, setState, bindState];

  return result;
}
