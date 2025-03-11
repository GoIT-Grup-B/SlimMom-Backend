import Product from '../db/models/products.js';

export async function getProductsByQuery(req, res, next) {
  console.log('getProductsByQuery FUNCTION INVOKED');
  let data = await Product.findOne({title:"ama"})
  res.status(200).json({
      message: 'geldi',
      data: data
  });
}
