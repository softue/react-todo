/*

https://www.taniarascia.com/getting-started-with-react/

      <pre> { JSON.stringify(todos) } </pre>


*/

import {useEffect, useState} from "react";
//import logo from './logo.svg'
import './App.css';
import { createTodo, readTodos } from './api';
import Preloader from './components/Preloader';

function App() {

const [ todos, setTodos ] = useState(null);
const [ todo, setTodo ] = useState({title:'', content:''});

const fetchData = async() => {
  const result = await readTodos();
  console.log(result);
  setTodos(result.data);
  console.log(todos);
}

useEffect( () => {
  fetchData();
}, []);

const onSubmitHandler = async (e) => {
  e.preventDefault();
  const result = await createTodo(todo);
  console.log(result);
  fetchData();
}

  return (
    <div className="container">
      <div className="row">

      <form className="col s12" onSubmit={onSubmitHandler}>
          <div className="row">
            <div className="input-field col s6">
              <i className="material-icons prefix">title</i>
              <input id="icon_prefix" type="text" className="validate"
                onChange={e => setTodo({ ...todo, title: e.target.value })}
              />
              <label htmlFor="icon_prefix">Title</label>
            </div>
            <div className="input-field col s6">
              <i className="material-icons prefix">description</i>
              <input id="description" type="tel" className="validate"
                onChange={e => setTodo({ ...todo, content: e.target.value })}
              />
              <label htmlFor="description">Content</label>
            </div>
          </div>
          <div className="row right-align">
            <button className="waves-effect waves-light btn">Submit</button>
          </div>
        </form>

        { !todos ? <Preloader /> : 
        <ul>
          { todos.map(item => (
            <li>{item.title}</li>
            )) }
          <li>ola</li>
          <li>ola</li>
        </ul>
        }
    </div>
    </div>
  );
}

export default App;
