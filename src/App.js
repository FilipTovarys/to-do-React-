import { useState } from "react";
import { useEffect } from "react";
import Task from "./components/Task.js";
import "./App.css";
import Input from "./components/Input.js";


export default function App() {

  const [tasks , setTasks] = useState(getTasksFromLS)
  const [showOnlyDone, setShowOnlyDone] = useState(true);
  const [doneFilterButt, setDoneFilterButt] = useState(true);
  const [tasksLeft, setTasksLeft] = useState(0)
  const [isAtLeastOneCompleted, setIsAtLeastOneCompleted] = useState(false)
  const tasksLength = tasks.length;
  const moreThanOneTask = tasksLength >= 1;

  function getTasksFromLS() {
    let storedTasksJSON = localStorage.getItem("tasks")
    if (storedTasksJSON === null) {
      console.log("Empty tasks in localStorage")
      return []
    } else {
      console.log(storedTasksJSON)
      let storedTasks = JSON.parse(storedTasksJSON)
      return storedTasks
    }
  }

  function deleteAllTasks() {
    setTasks([]);
  }

  useEffect(() => {
    console.log("render", tasks);
  })

  useEffect(() => {
    let notCompletedTasks = tasks.filter((task) => task.completed === false);
    let tasksLeft = notCompletedTasks.length;
    setTasksLeft(tasksLeft);

    let completedTasks = tasks.filter((task) => task.completed === true);
    let completedTasksCounter = completedTasks.length;
    completedTasksCounter >= 1 ? 
      setIsAtLeastOneCompleted(true) : 
        setIsAtLeastOneCompleted(false)

    let tasksJSON = JSON.stringify(tasks)
    localStorage.setItem("tasks", tasksJSON)
  }, [tasks])

  function handleInputData(input) {
    let id = 0;
    if (tasksLength > 0) {
      let currentTasks = [...tasks];
      let sortedIds = currentTasks.sort((a, b) => b.id - a.id);
      let highestId = sortedIds[0].id;
      id = highestId + 1;
    } 
    const newTask = {id: id, text: input, completed: false}
    setTasks([newTask, ...tasks]);
  }


  function completedFilter() {
    setShowOnlyDone(!showOnlyDone)
    setDoneFilterButt(!doneFilterButt)
  }

  function deleteDoneTasks() {
    let currentTasks = [...tasks];
    let updatedTasks = currentTasks.filter((task) => task.completed === false)
    setTasks(updatedTasks)
  }

  function sortAb() {
    let sortedTasks = [...tasks]
    sortedTasks.sort((a, b) => a.text.localeCompare(b.text))
    setTasks(sortedTasks)
  }

  function handleTaskUpdate(updatedTask) {
    console.log(updatedTask)
    let updatedTasks = tasks.map((task) => {
      if (task.id === updatedTask.id) {
        return updatedTask
      }
      return task
    })
    setTasks(updatedTasks)
  }

  function handleTaskDelete(id) {
    console.log("delete task id:", id);
    const updatedTask = tasks.filter((task) => task.id !== id);
    setTasks(updatedTask);
  }
  
  return (
    <div className="app">
      <h1 className="text-3xl font-bold underline">To-do list</h1>
      <Input handleInput={handleInputData} />
      <div id="under-input">
        {moreThanOneTask && (
          <button className="filter-button" onClick={sortAb}>Sort A-Z</button>
        )}
        {moreThanOneTask && (
          <p>{tasksLeft} task left</p>
        )}
      </div>
      <div>
          <div>
            {tasks.map((onetask) => {
              return (
                showOnlyDone || onetask.completed ? (
                  <Task
                    key={onetask.id}
                    task={onetask}
                    onUpdate={handleTaskUpdate}
                    onDelete={handleTaskDelete}
                  ></Task>
                ): null
              );
            })}
          </div>
          <div id="filters">
              <button className={moreThanOneTask ? "filter-button" : "lifeless-filter-button"} onClick={deleteAllTasks}>Delete all</button>
              <button className={moreThanOneTask ? "filter-button" : "lifeless-filter-button"} onClick={completedFilter}>{doneFilterButt ? "Complete" : "All"}</button>
              <button className={isAtLeastOneCompleted ? "filter-button" : "lifeless-filter-button"} onClick={deleteDoneTasks}>Delete completed tasks</button>
          </div>
      </div>
    </div>
  );  
}