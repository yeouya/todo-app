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
    const {
      target: { value },
    } = e;
    setState(value);
  };

  const bindState = { value: state, onChange: handleChange };

  const result: Result = [state, setState, bindState];

  return result;
}
