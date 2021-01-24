import useTodosContext from "../hooks/useTodosContext";
import TodoForm from "../components/TodoForm";
import TodoList from "../components/TodoList";
import styles from "./Home.module.css";

const { main, article, heading, empty } = styles;

export default function Home() {
  const { todos } = useTodosContext();

  return (
    <main className={main}>
      <article className={article}>
        <h1 className={heading}>할 일 목록을 추가해보세요.</h1>
        <TodoForm />
        {todos.length ? (
          <TodoList />
        ) : (
          <p className={empty}>아직 할 일 목록이 없네요! 🤣</p>
        )}
      </article>
    </main>
  );
}
