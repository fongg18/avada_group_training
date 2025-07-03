import fs from 'fs';
import path from 'path';

const todosPath = path.join(process.cwd(), 'src/database/todos.json');

/**
 * Get all todos from the JSON file, with optional sorting and limiting.
 * @param {Object} [options] - Options for filtering the results.
 * @param {number} [options.limit] - Maximum number of todos to return.
 * @param {string} [options.sortBy] - Field name to sort by (e.g., 'createdAt').
 * @param {string} [options.order='desc'] - Sort order: 'asc' or 'desc'.
 * @returns {Array<Object>} Array of todo objects.
 */
export function getAll({ limit, sortBy, order = 'desc' } = {}) {
  if (!fs.existsSync(todosPath)) return [];
  let { data } = JSON.parse(fs.readFileSync(todosPath, 'utf-8'));
  data = data || [];

  let result = data;
  if (sortBy) {
    result = [...result].sort((a, b) => {
      if (order === 'asc') {
        return new Date(a[sortBy]) - new Date(b[sortBy]);
      }
      return new Date(b[sortBy]) - new Date(a[sortBy]);
    });
  }

  if (limit) {
    const n = parseInt(limit, 10);
    if (!isNaN(n) && n > 0) result = result.slice(0, n);
  }

  return result;
}

/**
 * Get a single todo by its id.
 * @param {number} id - The id of the todo to retrieve.
 * @returns {Object|undefined} The todo object if found, otherwise undefined.
 */
export function getOne(id) {
  return getAll().find(todo => todo.id === id);
}

/**
 * Add a new todo to the JSON file.
 * @param {Object} data - The todo data to add (e.g., { text, isCompleted }).
 * @returns {Object} The newly created todo object with id and createdAt fields.
 */
export function add(data) {
  const todos = getAll();
  const maxId = todos.length ? Math.max(...todos.map(todo => todo.id)) : 0;
  const newTodo = {
    ...data,
    id: maxId + 1,
    createdAt: new Date().toISOString()
  };
  todos.push(newTodo);
  fs.writeFileSync(todosPath, JSON.stringify({ data: todos }, null, 2));
  return newTodo;
}

/**
 * Update an existing todo by its id.
 * @param {number} id - The id of the todo to update.
 * @param {Object} data - The new data to update the todo with.
 * @returns {Object|null} The updated todo object if found, otherwise null.
 */
export function update(id, data) {
  const todos = getAll();
  const idx = todos.findIndex(todo => todo.id === id);
  if (idx === -1) return null;
  todos[idx] = { ...todos[idx], ...data };
  fs.writeFileSync(todosPath, JSON.stringify({ data: todos }, null, 2));
  return todos[idx];
}

/**
 * Remove a todo by its id.
 * @param {number} id - The id of the todo to remove.
 * @returns {Object|null} The removed todo object if found, otherwise null.
 */
export function remove(id) {
  const todos = getAll();
  const idx = todos.findIndex(todo => todo.id === id);
  if (idx === -1) return null;
  const newTodos = todos.filter(todo => todo.id !== id);
  fs.writeFileSync(todosPath, JSON.stringify({ data: todos }, null, 2));
  return deleted;
}

// export function replaceAll(newTodos) {
//   const todos = newTodos.map((todo, idx) => ({
//     ...todo,
//     id: idx + 1,
//     createdAt: new Date().toISOString()
//   }));
//   fs.writeFileSync(todosPath, JSON.stringify({ data: todos }, null, 2));
//   return todos;
// }