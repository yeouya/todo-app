import useTodosContext from "../hooks/useTodosContext";
import TodoItem from "./TodoItem";
import styles from "./TodoList.module.css";

const { list } = styles;

export default function TodoList() {
  const { todos } = useTodosContext();

  return (
    <ul className={list}>
      {todos.map((todo) => {
        const { id } = todo;
        return <TodoItem key={id} todo={todo} />;
      })}
    </ul>
  );
}
