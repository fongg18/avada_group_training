import Router from 'koa-router';
import { validateTodo, todoSchema } from '../middleware/validateTodo.js';
import * as handlers from '../handlers/todoHandlers.js';

const apiRouter = new Router();

apiRouter.get('/api/todos', handlers.getTodos);
apiRouter.post('/api/todos', validateTodo(todoSchema), handlers.createTodo);
apiRouter.get('/api/todo/:id', handlers.getTodoById);
apiRouter.put('/api/todo/:id', validateTodo(todoSchema), handlers.updateTodo);
apiRouter.delete('/api/todo/:id', handlers.deleteTodo);

export default [
  apiRouter.routes(),
  apiRouter.allowedMethods()
];