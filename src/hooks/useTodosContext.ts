import { useContext } from "react";
import { TodosContext } from "../contexts/TodosContext";

export default function useTodosContext() {
  const context = useContext(TodosContext);
  if (!context) {
    throw new Error("TodosProvider 컴포넌트를 찾을 수 없습니다.");
  }
  return context;
}
