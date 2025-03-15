import createHttpError from 'http-errors';
import { getProductsForDateService } from '../../services/user.js';

const countCalories = async (req, res) => {
  const { date } = req.query;
  const owner = req.user._id;
  if (!date || isNaN(Date.parse(date))) {
    throw createHttpError(400, 'Invalid date!');
  }
  const dateFormatted = new Date(date).toISOString().split('T')[0];

  const products = await getProductsForDateService(owner, dateFormatted);

  if (!products.length)
    throw createHttpError(
      404,
      `No products found for this date! (${dateFormatted})`,
    );

  const totalCalories = products.reduce((acc, product) => {
    const productCalories =
      (product.productId.calories / 100) * product.productWeight;
    return acc + productCalories;
  }, 0);

  res.status(200).json({
    message: `Users total calory for ${dateFormatted} calculated successfully!`,
    date,
    totalCalories,
  });
};

export { countCalories };
