import axios from 'axios'

export const saveTodo = (todo) => axios.post('http://localhost:3030/api/todos', todo)

export const fetchTodos = () => axios.get('http://localhost:3030/api/todos')

export const updateTodo = (todo) => axios.put(`http://localhost:3030/api/todos/${todo.id}`, todo)

export const destroyTodo = id => axios.delete(`http://localhost:3030/api/todos/${todo.id}`)