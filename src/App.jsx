import AddTask from './components/AddTask'
import Tasks from './components/Tasks'
import { useEffect, useState } from 'react'
import { v4 } from 'uuid'

function App() {
  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem('tasks')) || []
  )

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])

  /* useEffect(() => {
    async function fetchTasks() {
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/todos?_limit=10',
        {
          method: 'GET'
        }
      )
      const data = await response.json()
      setTasks(data)
    }
    // se quiser , você pode chamar a API para buscar as tarefas
    //fetchTasks()
  }, []) */

  function onTaskClick(taskId) {
    const newTasks = tasks.map(task => {
      // PRECISO ATUALIZAR ESSA TAREFA
      if (task.id === taskId) {
        return { ...task, isCompleted: !task.isCompleted }
      }

      // NÃO PRECISO ATUALIZAR ESSA TAREFA
      return task
    })
    setTasks(newTasks)
  }

  function onDeleteTaskClick(taskId) {
    const newTasks = tasks.filter(task => task.id !== taskId)
    setTasks(newTasks)
  }

  function onAddTaskSubmit(title, description) {
    const newTask = {
      id: v4(),
      title,
      description,
      isCompleted: false
    }
    setTasks([...tasks, newTask])
  }

  return (
    <div
      className="w-screen h-screen bg-slate-500 flex just-center
    p-6"
    >
      <div className="w-[500px] space-y-4">
        <h1 className="text-3xl text-slate-100 font-bold text-center">
          Gerenciador de Tarefas
        </h1>
        <AddTask onAddTaskSubmit={onAddTaskSubmit} />
        <Tasks
          tasks={tasks}
          onTaskClick={onTaskClick}
          onDeleteTaskClick={onDeleteTaskClick}
        />
      </div>
    </div>
  )
}

export default App
