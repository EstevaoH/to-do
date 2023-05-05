import { Trash } from "phosphor-react";
import styles from "./Task.module.css";
import { useState } from "react";

interface Task {
  id: string;
  content: string;
  completed: boolean;
}

interface TakProps {
  id: string;
  content: string;
  completed?: boolean;
  onDeleteTaks: (task: string) => void;
  onChangeTask: (task: string) => void;
}

export function Task({
  id,
  content,
  completed,
  onDeleteTaks,
  onChangeTask,
}: TakProps) {
  const [show, setShow] = useState(false);

  function handleDeleteComment() {
    let interval: number;
    if (!show) {
      setShow(true);
      interval = setTimeout(() => {
        onDeleteTaks(id!);
        setShow(false);
      }, 500);
    }
    return () => {
      clearTimeout(interval);
    };
  }
  const fade = `${styles.fadeOutTask} ${styles.fadeInTop}`;

  function handelCompletedTask() {
    onChangeTask(id!);
  }

  return (
    <div
      className={`${styles.cardTask} ${styles.fadeInTask} ${!show ? "" : fade}`}
    >
      <input
        type="checkbox"
        checked={completed}
        onChange={handelCompletedTask}
      />
      <div className={styles.cardTaskContent}>
        <p>{content}</p>
      </div>
      <button onClick={handleDeleteComment}>
        <Trash size={20} />
      </button>
    </div>
  );
}
