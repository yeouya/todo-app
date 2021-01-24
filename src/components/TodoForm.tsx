import { useRef, useEffect } from "react";
import useTodosContext from "../hooks/useTodosContext";
import useInput from "../hooks/useInput";
import { FormEvent } from "react";
import styles from "./TodoForm.module.css";

export default function TodoForm() {
  const inputRef = useRef<HTMLInputElement>(null);
  const { edit, setInput, addTodo, editTodo } = useTodosContext();
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
    } else {
      editTodo(text, edit.id);
    }
  };

  useEffect(() => {
    if (edit) {
      setText(edit.text);
    } else {
      setText("");
    }
    setInput(inputRef);
  }, [edit, setText, setInput]);

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        className={styles.input}
        type="text"
        title="오늘 할 일"
        placeholder="오늘 할 일은..."
        autoFocus
        required
        ref={inputRef}
        {...bindText}
      />
      <button className={styles.button} type="submit">
        {edit ? "수정" : "추가"}
      </button>
    </form>
  );
}
