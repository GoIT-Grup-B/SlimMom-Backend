import Product from '../db/models/products.js';

export async function getProductsByQuery(req, res, next) {
  let data = await Product.find({ title: /ama/i });
  res.status(200).json({
    message: 'geldi',
    data: data,
  });
}
