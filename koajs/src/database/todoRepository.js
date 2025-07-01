import fs from 'fs';
import path from 'path';

const todosPath = path.join(process.cwd(), 'src/database/todos.json');

export function getAll() {
  if (!fs.existsSync(todosPath)) return [];
  const { data } = JSON.parse(fs.readFileSync(todosPath, 'utf-8'));
  return data || [];
}

export function getOne(id) {
  return getAll().find(todo => todo.id === id);
}

export function add(data) {
  const todos = getAll();
  const newTodo = {
    ...data,
    id: todos.length ? todos[todos.length - 1].id + 1 : 1,
    createdAt: new Date().toISOString()
  };
  todos.push(newTodo);
  fs.writeFileSync(todosPath, JSON.stringify({ data: todos }, null, 2));
  return newTodo;
}

export function update(id, data) {
  const todos = getAll();
  const idx = todos.findIndex(todo => todo.id === id);
  if (idx === -1) return null;
  todos[idx] = { ...todos[idx], ...data };
  fs.writeFileSync(todosPath, JSON.stringify({ data: todos }, null, 2));
  return todos[idx];
}

export function remove(id) {
  const todos = getAll();
  const idx = todos.findIndex(todo => todo.id === id);
  if (idx === -1) return null;
  const [deleted] = todos.splice(idx, 1);
  fs.writeFileSync(todosPath, JSON.stringify({ data: todos }, null, 2));
  return deleted;
}

export function replaceAll(newTodos) {
  // Gán lại id và createdAt cho từng todo
  const todos = newTodos.map((todo, idx) => ({
    ...todo,
    id: idx + 1,
    createdAt: new Date().toISOString()
  }));
  fs.writeFileSync(todosPath, JSON.stringify({ data: todos }, null, 2));
  return todos;
}