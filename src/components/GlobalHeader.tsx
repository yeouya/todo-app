import styles from "./GlobalHeader.module.css";

export default function GlobalHeader() {
  return (
    <header className={styles.header}>
      <h1 className={styles.heading}>Todo App</h1>
    </header>
  );
}
