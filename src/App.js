import {useQuery, useMutation} from "react-query";
import {getTasks, createTask} from "./requests";

const App = () => {
  const newTaskMutation = useMutation(createTask)

  const addTask = async (event) => {
    event.preventDefault()
    const content = event.target.task.value
    event.target.task.value = ''
    newTaskMutation.mutate({content, important: true})
  }

  const toggleImportance = (task) => {
    console.log('toggle importance of', task.id)
  }

  const result = useQuery('tasks', getTasks)

  console.log(result)

  if (result.isLoading) {
    return <div>loading data...</div>
  }

  const tasks = result.data

  return(
    <div>
      <h2>Tasks app</h2>
      <form onSubmit={addTask}>
        <input name="task" />
        <button type="submit">add</button>
      </form>
      {tasks.map(task =>
        <li key={task.id} onClick={() => toggleImportance(task)}>
          {task.content}
          <strong> {task.important ? '- important' : ''}</strong>
        </li>
      )}
    </div>
  )
}

export default App