import Router from 'koa-router';
import { validateProduct, productSchema } from '../middleware/validateProduct.js';
import * as handlers from '../handlers/productHandlers.js';
import { printValue } from 'yup';

const router = new Router({ prefix: '/api' });

router.get('/view/products', handlers.getProducts);
router.get('/view/product/:id', handlers.getProductById);
router.post('/view/products', validateProduct(productSchema), handlers.createProduct);
router.put('/view/product/:id', validateProduct(productSchema), handlers.updateProduct);
router.delete('/view/product/:id', handlers.deleteProduct);

export default router;