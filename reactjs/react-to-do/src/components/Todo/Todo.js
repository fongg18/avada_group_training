import React from "react";

/**
 * Renders a single todo item with complete and remove buttons.
 * @param {Object} param0 - Props object.
 * @param {Object} param0.todo - The todo item to display.
 * @param {number} param0.index - The index of the todo item.
 * @param {Function} param0.completeTodo - Function to mark the todo as completed.
 * @param {Function} param0.removeTodo - Function to remove the todo.
 * @returns {JSX.Element} The rendered todo component.
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