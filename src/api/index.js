import axios from 'axios';
const url = "https://romulo-nodejs-todo.herokuapp.com/todos";

export const readTodos = () => axios.get(url);
export const createTodo = (newTodo) => axios.post(url, newTodo);
export const updateTodo = (todo) => axios.put(url + "/" + todo._id, todo);
export const deleteTodo = (id) => axios.delete(`${url}/${id}`);