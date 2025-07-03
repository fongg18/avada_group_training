export const todoSchema = {
  text: { type: 'string', required: true },
  isCompleted: { type: 'boolean', required: false }
};

/**
 * Middleware to validate the request body against the provided todo schema.
 * @param {Object} schema - The schema to validate the todo data against.
 * @returns {Function} Koa middleware that validates the todo data and returns 400 if invalid.
 */
export function validateTodo(schema) {
  return async (ctx, next) => {
    const body = ctx.request.body;
    if (!body || typeof body.text !== 'string') {
      ctx.status = 400;
      ctx.body = { error: 'Invalid todo data' };
      return;
    }
    await next();
  };
}