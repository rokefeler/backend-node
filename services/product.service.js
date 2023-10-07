const { faker } = require('@faker-js/faker');
const boom = require('@hapi/boom')

class ProductsService {
  constructor() {
    this.products = [];
    this.SIZE = 100;
    this.generate();
  }

  generate() {
    for (let index = 0; index < this.SIZE; index++) {
      this.products.push({
        id: faker.string.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(), 10),
        image: faker.image.url(),
        isblock: faker.datatype.boolean(),
      });
    }
  }
  async create(data) {
    const newProduct = {
      id: faker.string.uuid(),
      ...data,
    };
    this.products.push(newProduct);
    return newProduct;
  }

  async find() {
    return new Promise((resolve, reject)=>{
      setTimeout(() => {
        resolve(this.products);
      }, 3000);
    });
  }

  async findOne(id) {
    const index = this.products.findIndex((item) => item.id === id);
    if(index==-1)
      throw boom.notFound('Product not Found');
    const product = this.products[index];
    if(product.isblock){
      throw boom.conflict('product is Block!');
    }
    return product;
  }

  async update(id, changes) {
    const index = this.products.findIndex((e) => e.id === id);
    if (index === -1) {
      throw boom.notFound('Product not found');
    }
    const product = this.products[index];
    this.products[index] = { ...product, ...changes };
    return this.products[index];
  }

  async delete(id) {
    const index = this.products.findIndex((e) => e.id === id);
    if (index === -1) {
      throw boom.notFound('Product not found');
    }
    this.products.splice(index, 1);
    return id;
  }
}

module.exports = ProductsService;
