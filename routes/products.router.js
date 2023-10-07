const express = require('express');
const ProductService = require('./../services/product.service');
const validatorHandler = require('./../middlewares/validator.handles');
const { createProductSchema, updatedProductSchema, getProductSchema } = require('./../schemas/product.schema');

const router = express.Router();
const serviceProduct = new ProductService();

router.get('/', async (req, res) => {
  const products = await serviceProduct.find();
  res.json(products);
});

router.get('/filter', async (req, res) => {
  res.send('Yo soy un filter');
});

router.get('/:id',
  validatorHandler(getProductSchema, 'params'),
  async (req, res, next) => {
  try{
    const { id } = req.params;
    const product = await serviceProduct.findOne(id);
    if (!product) {
      res.status(404).json({
        message: 'NOT FOUND',
      });
    }

    res.json(product);
  }catch(err){
    next(err);
  }
});

router.post('/',
  validatorHandler(createProductSchema,'body'),
  async (req, res) => {
    const body = req.body;
    const newProduct = await serviceProduct.create(body);
    res.status(201).json(newProduct);
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const body = req.body;
  res.json({
    message: 'put update all',
    data: body,
    id,
  });
});

router.patch('/:id',
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updatedProductSchema, 'body'),
  async (req, res) => {
    try{
      const { id } = req.params;
      const body = req.body;
      const product = await serviceProduct.update(id, body);
      res.json(product);
    }catch(error){
      res.status(404).json({
        "message": error.message,
      });
    }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  res.json(await serviceProduct.delete(id));
});

module.exports = router;
