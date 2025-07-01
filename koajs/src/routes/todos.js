import Router from 'koa-router';
import { validateTodo, todoSchema } from '../middleware/validateTodo.js';
import * as handlers from '../handlers/todoHandlers.js';

const apiRouter = new Router({ prefix: '/api/todos' });

// API routes (RESTful, chỉ trả JSON)
apiRouter.get('/external', handlers.fetchExternalTodos);
apiRouter.get('/', handlers.getTodos);
apiRouter.get('/:id', handlers.getTodoById);
apiRouter.post('/', validateTodo(todoSchema), handlers.createTodo);
apiRouter.put('/:id', validateTodo(todoSchema), handlers.updateTodo);
apiRouter.delete('/:id', handlers.deleteTodo);

// View routes (không prefix '/api', chỉ render HTML)
const viewRouter = new Router();
viewRouter.get('/todos', handlers.renderTodosView);           // List
viewRouter.get('/todos/new', handlers.renderNewTodoView);     // Create form
viewRouter.get('/todos/:id', handlers.renderShowTodoView);    // Detail
viewRouter.get('/todos/:id/edit', handlers.renderEditTodoView); // Edit form
viewRouter.get('/todos/:id/delete', handlers.renderDeleteTodoView); // Confirm delete

// Xử lý form CRUD cho view (dùng POST, không trùng với API)
viewRouter.post('/todos', validateTodo(todoSchema), handlers.createTodoView); // Thêm mới
viewRouter.post('/todos/:id/edit', validateTodo(todoSchema), handlers.updateTodoView); // Sửa
viewRouter.post('/todos/:id/delete', handlers.deleteTodoView); // Xoá

export default [
  apiRouter.routes(),
  apiRouter.allowedMethods(),
  viewRouter.routes(),
  viewRouter.allowedMethods()
];