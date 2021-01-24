import useTodosContext from "../hooks/useTodosContext";
import useInput from "../hooks/useInput";
import { FormEvent } from "react";
import styles from "./TodoForm.module.css";

import { useEffect } from "react";
export default function TodoForm() {
  const { edit, addTodo, editTodo } = useTodosContext();

  const [text, setText, bindText] = useInput();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimText = text.trim();
    if (!trimText) {
      return;
    }
    if (!edit) {
      addTodo(trimText);
      setText("");
      return;
    }
    editTodo(text, edit.id);
  };

  useEffect(() => {
    if (edit) {
      setText(edit.text);
    } else {
      setText("");
    }
  }, [edit, setText]);

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        className={styles.input}
        type="text"
        title="오늘 할 일"
        placeholder="오늘 할 일은..."
        autoFocus
        required
        {...bindText}
      />
      <button className={styles.button} type="submit">
        {edit ? "수정" : "추가"}
      </button>
    </form>
  );
}
