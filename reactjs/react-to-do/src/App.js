import React, { useState, useEffect } from "react";
import "./App.css";
import Todo from "./components/Todo/Todo";
import TodoForm from "./components/TodoForm/TodoForm";
import { fetchTodos, addTodoApi, completeTodoApi, removeTodoApi } from "./api";

function App() {
  const [todos, setTodos] = useState([]);

useEffect(() => {
    const fetchData = async () => {
      const data = await fetchTodos();
      setTodos(data);
    };
    fetchData();
  }, []);

  const addTodo = text => {
    setTodos((previousTodos) => [...previousTodos, { text }]);
  };

  const completeTodo = index => {
    setTodos((previousTodos) => previousTodos.map((todo, i) => i === index ? { ...todo, isCompleted: true } : todo));
  };

  const removeTodo = async (index) => {
    setTodos((previousTodos) =>  previousTodos.filter((_, i) => i !== index));
  };

  return (
    <div className="app">
      <div className="todo-list">
        {todos.map((todo, index) => (
          <Todo
            key={index}
            index={index}
            todo={todo}
            completeTodo={completeTodo}
            removeTodo={removeTodo}
          />
        ))}
        <TodoForm addTodo={addTodo} />
      </div>
    </div>
  );
}

export default App;