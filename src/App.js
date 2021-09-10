import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, HashRouter } from 'react-router-dom'
import { Switch } from "react-router";
import Header from './components/Header'
import Footer from './components/Footer'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'
import About from './components/About'

const App = () => {
  const [showAddTask, setShowAddTask] = useState(false)
    const [tasks, setTasks] = useState([
      //   {
      //       id: 1,
      //       text: 'doc',
      //       day: 'Feb',
      //       reminder: true,
      //   },
      //   {
      //     id: 2,
      //     text: 'coc',
      //     day: 'Febff',
      //     reminder: true,
      // },
    ])

    useEffect(() => {
      const getTasks = async () => {
        const tasksFromServer = await fetchTasks()
        setTasks(tasksFromServer)
      }

    getTasks()
    }, [])

//  Fetch Tasks from API 
const fetchTasks = async () => {const res = await fetch('http://localhost:8000/tasks')
    const data = await res.json()
  
    return data}

  //  Fetch one Task from API 
const fetchTask = async (id) => {const res = await fetch(`http://localhost:8000/tasks/${id}`)
const data = await res.json()

return data}

// Add Task
const addTask = async (task) => {
  const res = await fetch('http://localhost:8000/tasks', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(task),
  })

  const data = await res.json()
  setTasks([...tasks, data])

  // console.log(task)
  // const id = Math.floor(Math.random() * 10000) + 1
  // console.log(id)
  // const newTask = { id, ...task}
  // setTasks([...tasks, newTask])
}

// Delete Task
const deleteTask = async (id) => {
  await fetch(`http://localhost:8000/tasks/${id}`, {
    method: 'DELETE',
  })

  setTasks(tasks.filter((task) => task.TaskId !== id))
}

// Toggle reminder
const toggleReminder = async (id) => {
  const taskToToggle = await fetchTask(id)
  const updTask = { ...taskToToggle, Reminder: !taskToToggle.Reminder }

  const res = await fetch(`http://localhost:8000/tasks/${id}`, {
  method:'PUT',
  headers: {
    'Content-type': 'application/json',
  },
  body: JSON.stringify(updTask),
  })

  const data = await res.json()

  setTasks(tasks.map((task) => task.TaskId === id ? {...task, Reminder: data.Reminder } : task))
}


  return (
    <HashRouter>
    <div className="container">
      
      <Header onAdd={() => setShowAddTask(!showAddTask)} showAdd={showAddTask} />
     
     <Switch>
      <Route path='/' exact render={(props) => (
        <>
         {showAddTask && <AddTask onAdd={addTask} />}
      {tasks.length > 0 ? (<Tasks tasks={tasks} 
      onDelete={deleteTask} 
      onToggle={toggleReminder} />) : ('No tasks yet!')}
        </>
      )} />
      <Route path='/about' component={About} />
      </Switch>
      <Footer />
    </div>
  </HashRouter>
  )
}


export default App;
