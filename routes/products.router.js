const express = require('express');
const ProductService = require('./../services/product.service');

const router = express.Router();
const serviceProduct = new ProductService();

router.get('/', (req, res) => {
  const products = serviceProduct.find();
  res.json(products);
});

router.get('/filter', (req, res) => {
  res.send('Yo soy un filter');
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  const product = serviceProduct.findOne(id);
  if (!product) {
    res.status(404).json({
      message: 'NOT FOUND',
    });
  }

  res.json(product);
});

router.post('/', (req, res) => {
  const body = req.body;
  const newProduct = serviceProduct.create(body);
  res.status(201).json(newProduct);
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const body = req.body;
  res.json({
    message: 'put update all',
    data: body,
    id,
  });
});

router.patch('/:id', (req, res) => {
  const { id } = req.params;
  const body = req.body;
  const product = serviceProduct.update(id, body);
  res.json(product);
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  res.json(serviceProduct.delete(id));
});

module.exports = router;
