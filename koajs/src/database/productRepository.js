import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataPath = path.join(__dirname, './products.json');

export function readProducts() {
  return JSON.parse(fs.readFileSync(dataPath));
}
export function writeProducts(products) {
  fs.writeFileSync(dataPath, JSON.stringify(products, null, 2));
}