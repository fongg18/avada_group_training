import Koa from 'koa';
import koaBody from 'koa-body';
import views from 'koa-views';
import path from 'path';
import routers from './routes/todos.js';
import cors from '@koa/cors';

const app = new Koa();

app.use(cors());
app.use(koaBody());
// app.use(
//   views(path.join(path.resolve(), 'src/views'), {
//     extension: 'ejs'
//   })
// );;

routers.forEach(r => app.use(r));

app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});