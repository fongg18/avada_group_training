/**
 * Picks specified fields from an object and returns a new object with only those fields.
 * @param {Object} obj - The source object to pick fields from.
 * @param {string} fields - Comma-separated string of field names to pick.
 * @returns {Object} A new object containing only the specified fields.
 */
export function pickFields(obj, fields) {
  const picked = {};
  fields.split(',').forEach(f => {
    if (obj[f] !== undefined) picked[f] = obj[f];
  });
  return picked;
}