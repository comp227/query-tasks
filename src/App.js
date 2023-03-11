import {useQuery, useMutation, useQueryClient} from "react-query";
import {getTasks, createTask, updateTask} from "./requests";

const App = () => {
  const queryClient = useQueryClient()

  const newTaskMutation = useMutation(createTask, {
    onSuccess: (newTask) => {
      const tasks = queryClient.getQueryData('tasks')
      queryClient.setQueryData('tasks', tasks.concat(newTask))
    }
  })

  const updateTaskMutation = useMutation(updateTask, {
    onSuccess: () => {
      queryClient.invalidateQueries('tasks')
    },
  })

  const addTask = async (event) => {
    event.preventDefault()
    const content = event.target.task.value
    event.target.task.value = ''
    newTaskMutation.mutate({content, important: true})
  }

  const toggleImportance = (task) => {
    updateTaskMutation.mutate({...task, important: !task.important })
  }

  const result = useQuery('tasks', getTasks, {
    refetchOnWindowFocus: false
  })

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