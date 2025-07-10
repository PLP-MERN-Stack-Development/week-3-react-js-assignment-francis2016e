import { useEffect, useState } from 'react';
import "./index.css";
import Task from './components/Task';
import TaskForm from './components/TaskForm';




function App() {
 const [tasks, setTasks] = useState(() =>{
  try{
      const saved = localStorage.getItem("tasks");
  return saved ? JSON.parse(saved) : [];
    }
 catch (error){
console.error("Failed to parse todos from localStorage:", error);
    return [];
 }
  })
  


 useEffect(() =>{
  localStorage.setItem("tasks", JSON.stringify(tasks))
 }, [tasks]);

 const toggleTask = id =>{
  setTasks(curr => curr.map(t=> t.id === id ? { ...t, completed: !t.completed}: t));
 }

 const addTask = title =>{
  setTasks(curr =>[

    {id: Date.now(), title, completed:false},
    ...curr
  ]);
 };

  return (
    <div className='min-h-screen bg-gray-100 p-20'>
      <h1 className='font-bold text-3xl w-70 bg-blue-300 mb-10 '>Task Dashboard</h1>

          <TaskForm onAdd={addTask}/>

      {tasks.length ? (
        tasks.map(task =>(
        <Task key={task.id} {...task} onToggle={toggleTask}/>
      ))
      ) : (
        <p className='text-gray-500'>No tasks yet add one</p>
      ) 
      }
    </div>
  );
}

export default App
