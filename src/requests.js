import axios from 'axios'

export const getTasks = () =>
    axios.get('http://localhost:3001/tasks').then(res => res.data)