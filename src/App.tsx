import { PlusCircle } from "phosphor-react";
import { v4 as uuidv4 } from "uuid";
import { Header } from "./Components/Header/Header";
import { Task } from "./Components/Taks/Task";

import clipboard from "./assets/clipboard.svg";
import styles from "./App.module.css";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";

interface Task {
  id: string;
  content: string;
  completed: boolean;
}

export function App() {
  const [newTasks, setNewTasks] = useState({
    id: "",
    content: "",
    completed: false,
  });
  const [tasks, setTasks] = useState<Task[]>([]);
  const [completedTasks, setCompletedTasks] = useState(0);

  const isNewTaskEmpty = newTasks.content.length === 0;
  const isNewTaskMoreLimit = newTasks.content.length > 150;

  useEffect(() => {
		let completeArray = [];
		tasks.filter((todo) => todo.completed === true && completeArray.push(todo));
		setCompletedTasks(completeArray.length);
	}, [tasks]);


  useEffect(() => {
    const tasksItem = JSON.parse(localStorage.getItem("@to-do:task-1.0.0") as any);
    if (tasksItem) {
      setTasks(tasksItem);
      console.log(tasksItem);
    }
  }, []);

  useEffect(() => {
    if(tasks.length > 0){
      localStorage.setItem("@to-do:task-1.0.0", JSON.stringify(tasks));
    }else{
      localStorage.clear()
    }
    console.log(tasks);
  }, [tasks]);

  function handleCreateNewTask(event: FormEvent) {
    event.preventDefault();
    setTasks([newTasks, ...tasks]);
    setNewTasks({ id: "", content: "", completed: false });
  }

  function handleNewTaskChange(event: ChangeEvent<HTMLInputElement>) {
    setNewTasks({
      id: uuidv4(),
      content: event.target.value,
      completed: false,
    });
  }

  function deleteTask(taskToDelete: string) {
    const taskWithouToDeleteOne = tasks.filter((item: Task) => {
      return item.id !== taskToDelete;
    });
    setTasks(taskWithouToDeleteOne);
  }
  function toggleComplete (taskToCompleted: string){
    tasks.find((task) => {
			if (task.id === taskToCompleted) {
				task.completed = !task.completed;
			}
			return setTasks([...tasks]);
		});
  }

  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.wrapper}>
        <form onSubmit={handleCreateNewTask} className={styles.formTask}>
          <fieldset className={styles.wrapperInput}>
            <input
              onChange={handleNewTaskChange}
              className={styles.inputTask}
              type="text"
              value={newTasks.content}
              name="task"
              placeholder="Add a new task"
            />
            <small
              className={
                newTasks.content.length > 150
                  ? styles.limitCharacterInvalid
                  : styles.limitCharacter
              }
            >
              Character limit - {newTasks.content.length}/150
            </small>
          </fieldset>
          <button disabled={isNewTaskEmpty || isNewTaskMoreLimit} type="submit">
            Add <PlusCircle size={19} />
          </button>
        </form>
        <div className={styles.taskCount}>
          <span className={styles.taskPending}>
            Task <span className={styles.taskPendingCount}>{tasks.length}</span>
          </span>
          <span className={styles.taskCompleted}>
            Completed{" "}
            <span className={styles.taskCompletedCount}>
              {completedTasks}&nbsp; de&nbsp; {tasks.length}
            </span>
          </span>
        </div>

        {tasks.length === 0 && (
          <div className={styles.emptyTaskList}>
            <img src={clipboard} alt="" />
            <p className={styles.paragraph}>
              Você ainda não tem tarefas cadastradas
              <span>Crie tarefas e organize seus itens a fazer</span>
            </p>
          </div>
        )}
        {tasks.map((task: Task) => {
          return (
            <Task
              content={task.content}
              id={task.id}
              key={task.id}
              completed={task.completed}
              onDeleteTaks={deleteTask}
              onChangeTask={toggleComplete}
            />
          );
        })}
      </main>
    </div>
  );
}
