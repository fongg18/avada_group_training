export function pickFields(obj, fields) {
  const picked = {};
  fields.split(',').forEach(f => {
    if (obj[f] !== undefined) picked[f] = obj[f];
  });
  return picked;
}