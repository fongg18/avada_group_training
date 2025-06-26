import fs from 'fs';
import faker from 'faker';

const products = [];

for (let i = 1; i <= 1000; i++) {
  products.push({
    id: i,
    name: faker.commerce.productName(),
    price: Number(faker.commerce.price()),
    description: faker.commerce.productDescription(),
    product: faker.commerce.product(),
    color: faker.commerce.color(),
    createdAt: faker.date.past().toISOString(),
    image: faker.image.imageUrl()
  });
}

fs.writeFileSync('./src/database/products.json', JSON.stringify(products, null, 2));
console.log('Generated 1000 products!');