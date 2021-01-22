import { ReactNode } from "react";

export interface Props {
  children?: ReactNode;
}

export interface Todo {
  id: string;
  text: string;
  isDone: boolean;
}
