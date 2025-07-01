import React from "react";

/**
 *
 * @param {Object} param0
 * @param {Object} param0.todo
 * @param {number} param0.index
 * @param {Function} param0.completeTodo
 * @param {Function} param0.removeTodo
 * @returns {JSX.Element}
 */
function Todo({ todo, index, completeTodo, removeTodo }) {
  return (
    <div
      className="todo"
      style={{ textDecoration: todo.isCompleted ? "line-through" : "" }}
    >
      {todo.text}
      <div>
        <button onClick={() => completeTodo(index)}>Complete</button>
        <button onClick={() => removeTodo(index)}>x</button>
      </div>
    </div>
  );
}

export default Todo;