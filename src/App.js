/*

https://www.taniarascia.com/getting-started-with-react/

      <pre> { JSON.stringify(todos) } </pre>


*/

import {useEffect, useState} from "react";
//import logo from './logo.svg'
import './App.css';
import { createTodo, readTodos, updateTodo, deleteTodo } from './functions';
import Preloader from './components/Preloader';

function App() {

const [ todo, setTodo ] = useState({title:'', content:''});
const [ todos, setTodos ] = useState(null);
const [ currentId, setCurrentId ] = useState(0);

const fetchData = async() => {
  const result = await readTodos();
  console.log(result);
  setTodos(result);
  console.log(todos);
}

useEffect( async () => {
  console.log("currentId", currentId);
  const result = currentId!==0 ? todos.find( i => i._id === currentId ) : {title:'', content:''};
  setTodo(result);
  await document.getElementById("form_description").focus();
  await document.getElementById("form_title").focus();
}, [currentId]);

useEffect( async () => {
  fetchData();
  window.addEventListener('keydown', handleKeyDown);
}, []);

function handleKeyDown(e) {
  if (e.keyCode === 27) clear();
}

function clear() {
  setTodo({title:'', content: ''});
  setCurrentId(0);
}

const onSubmitHandler = async (e) => {
  let result;
  e.preventDefault();
  if ( currentId === 0 )
    result = await createTodo(todo);
  else
    result = await updateTodo(todo);
  console.log(result);
  fetchData();
  //setTodos([...todos, result]);
}

const onClickDeleteHandler = async(id) => {
  console.log('delete', id);
  await deleteTodo(id);
  fetchData();
}


return (
    <div className="container">
      <div className="row">
      <form className="col s12" onSubmit={onSubmitHandler}>
          <div className="row">
            <div className="input-field col s6">
              <i className="material-icons prefix">title</i>
              <input id="form_title" type="text" className="validate" value={todo.title}
                onChange={e => setTodo({ ...todo, title: e.target.value })}
              />
              <label htmlFor="form_title">Title</label>
            </div>
            <div className="input-field col s6">
              <i className="material-icons prefix">description</i>
              <input id="form_description" type="tel" className="validate" value={todo.content}
                onChange={e => setTodo({ ...todo, content: e.target.value })}
              />
              <label htmlFor="form_description">Content</label>
            </div>
          </div>
          <div className="row right-align">
            <button className="waves-effect waves-light btn">Submit</button>
          </div>
        </form>

        { !todos ? <Preloader /> : 
        <ul className="collection">
          { todos.map(item => (
            <li onClick={ () => setCurrentId(item._id) } key={item._id} className="collection-item"><div><h5>{item.title}</h5><p>{item.content}<a href="#!" className="secondary-content"><i className="material-icons" onClick={() => onClickDeleteHandler(item._id)}>delete</i></a></p></div></li>
            )) }
        </ul>
        }
    </div>
    </div>
  );
}

export default App;
