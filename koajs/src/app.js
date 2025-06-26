import Koa from 'koa';
import koaBody from 'koa-body';
import views from 'koa-views';
import path from 'path';
import productsRouter from './routes/products.js';
import methodOverride from 'koa-methodoverride';

const app = new Koa();

app.use(koaBody());
app.use(
  views(path.join(path.resolve(), 'src/views'), {
    extension: 'ejs'
  })
);
app.use(methodOverride('_method'));
app.use(productsRouter.routes()).use(productsRouter.allowedMethods());

app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});