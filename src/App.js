import {useQuery} from "react-query";
import axios from "axios";

const App = () => {
  const addTask = async (event) => {
    event.preventDefault()
    const content = event.target.task.value
    event.target.task.value = ''
    console.log(content)
  }

  const toggleImportance = (task) => {
    console.log('toggle importance of', task.id)
  }

  const result = useQuery(
      'tasks',
      () => axios.get('http://localhost:3001/tasks').then(res => res.data)
  )

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