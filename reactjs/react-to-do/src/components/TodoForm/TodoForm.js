import React from "react";

/**
 * Renders a form to add a new todo item.
 * @param {Object} param0 - Props object.
 * @param {Function} param0.addTodo - Function to add a new todo.
 * @returns {JSX.Element} The rendered todo form component.
 */
function TodoForm({ addTodo }) {
  const [value, setValue] = React.useState("");

  const handleSubmit = e => {
    e.preventDefault();
    if (!value) return;
    addTodo(value);
    setValue("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        className="input"
        value={value}
        onChange={e => setValue(e.target.value)}
      />
    </form>
  );
}

export default TodoForm;