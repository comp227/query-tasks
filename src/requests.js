import axios from 'axios'

const baseUrl = 'http://localhost:3001/tasks'

export const getTasks = () =>
    axios.get('http://localhost:3001/tasks').then(res => res.data)

export const createTask = newTask =>
    axios.post(baseUrl, newTask).then(res => res.data)