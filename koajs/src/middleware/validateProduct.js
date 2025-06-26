import * as yup from 'yup';

export const productSchema = yup.object({
  name: yup.string().required(),
  price: yup.number().required(),
  description: yup.string().required(),
  product: yup.string().required(),
  color: yup.string().required(),
  image: yup.string().url().required(),
});

export function validateProduct(schema) {
  return async (ctx, next) => {
    try {
      await schema.validate(ctx.request.body);
      await next();
    } catch (err) {
      ctx.status = 400;
      ctx.body = { error: err.errors || err.message };
    }
  };
}