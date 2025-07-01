export const todoSchema = {
  text: { type: 'string', required: true },
  isCompleted: { type: 'boolean', required: false }
};

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