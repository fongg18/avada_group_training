import { readProducts, writeProducts } from '../database/productRepository.js';
import { pickFields } from '../utils.js';

export const getProducts = (ctx) => {
  let products = readProducts();
  const { limit, sort } = ctx.query;
  if (sort === 'desc') products = products.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  if (sort === 'asc') products = products.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
  if (limit) products = products.slice(0, Number(limit));
  ctx.body = products;
};

export const getProductById = (ctx) => {
  const id = Number(ctx.params.id);
  const { fields } = ctx.query;
  const product = readProducts().find(p => p.id === id);
  if (!product) {
    ctx.status = 404;
    ctx.body = { error: 'Product not found' };
    return;
  }
  ctx.body = fields ? pickFields(product, fields) : product;
};

export const createProduct = (ctx) => {
  const products = readProducts();
  const newProduct = {
    ...ctx.request.body,
    id: products.length ? products[products.length - 1].id + 1 : 1,
    createdAt: new Date().toISOString()
  };
  products.push(newProduct);
  writeProducts(products);
  ctx.status = 201;
  ctx.body = newProduct;
};

export const updateProduct = (ctx) => {
  const id = Number(ctx.params.id);
  const products = readProducts();
  const idx = products.findIndex(p => p.id === id);
  if (idx === -1) {
    ctx.status = 404;
    ctx.body = { error: 'Product not found' };
    return;
  }
  products[idx] = { ...products[idx], ...ctx.request.body };
  writeProducts(products);
  ctx.body = products[idx];
};

export const deleteProduct = (ctx) => {
  const id = Number(ctx.params.id);
  let products = readProducts();
  const product = products.find(p => p.id === id);
  if (!product) {
    ctx.status = 404;
    ctx.body = { error: 'Product not found' };
    return;
  }
  const newProducts = products.filter(p => p.id !== id);
  writeProducts(newProducts);
  ctx.body = product;
};