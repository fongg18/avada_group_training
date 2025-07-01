import * as repo from '../database/todoRepository.js';

import fetch from 'node-fetch';

// Chỉ fetch todos từ jsonplaceholder
export const fetchExternalTodos = async (ctx) => {
  const res = await fetch('https://jsonplaceholder.typicode.com/todos');
  if (!res.ok) {
    ctx.status = 502;
    ctx.body = { error: 'Failed to fetch external todos' };
    return;
  }
  const todos = await res.json();
  ctx.body = todos;
};


// Higher order function cho API handler
const withRepo = (repoFn, notFoundMsg = 'Todo not found') => (ctx) => {
  const id = ctx.params.id ? Number(ctx.params.id) : undefined;
  const result = id !== undefined ? repoFn(id, ctx.request?.body) : repoFn(ctx.request?.body);
  if (result === null || result === undefined) {
    ctx.status = 404;
    ctx.body = { error: notFoundMsg };
    return;
  }
  ctx.body = result;
};

// API handlers
export const getTodos = (ctx) => { ctx.body = repo.getAll(); };
export const getTodoById = withRepo(repo.getOne);
export const createTodo = withRepo(repo.add);
export const updateTodo = withRepo(repo.update);
export const deleteTodo = withRepo(repo.remove);

// Higher order function cho view handler
const renderView = (view, repoFn) => async (ctx) => {
  const id = ctx.params.id ? Number(ctx.params.id) : undefined;
  const data = id !== undefined ? repoFn(id) : undefined;
  if (repoFn && id !== undefined && !data) {
    ctx.status = 404;
    ctx.body = 'Todo not found';
    return;
  }
  await ctx.render(view, data ? { todo: data } : {});
};

// View handlers
export const renderTodosView = async (ctx) => {
  const todos = repo.getAll();
  await ctx.render('todos', { todos });
};
export const renderNewTodoView = renderView('new');
export const renderShowTodoView = renderView('show', repo.getOne);
export const renderEditTodoView = renderView('edit', repo.getOne);
export const renderDeleteTodoView = renderView('delete', repo.getOne);

// Xử lý tạo mới từ form
export const createTodoView = async (ctx) => {
  repo.add(ctx.request.body);
  ctx.redirect('/todos');
};

// Xử lý cập nhật từ form
export const updateTodoView = async (ctx) => {
  repo.update(Number(ctx.params.id), ctx.request.body);
  ctx.redirect('/todos');
};

// Xử lý xoá từ form
export const deleteTodoView = async (ctx) => {
  repo.remove(Number(ctx.params.id));
  ctx.redirect('/todos');
};