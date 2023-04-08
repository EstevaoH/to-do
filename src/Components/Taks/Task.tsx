import { Trash } from "phosphor-react";
import styles from "./Task.module.css";

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
  onChangeTask: (task: string) =>void;
}



export function Task({ id, content, completed ,onDeleteTaks,onChangeTask }: TakProps) {
  function handleDeleteComment(){
    onDeleteTaks(id!)
  }

  function handelCompletedTask(){
    onChangeTask(id!)
  }

  return (
    <div className={styles.cardTask}>
      <input type="checkbox" checked={completed} onChange={handelCompletedTask} />
      <div className={styles.cardTaskContent}>
        <p>{content}</p>
      </div>
      <button onClick={handleDeleteComment}>
        <Trash size={20} />
      </button>
    </div>
  );
}
