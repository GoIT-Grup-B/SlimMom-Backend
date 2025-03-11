import { MyProducts } from '../../db/models/MyProducts.model.js';

const addMyProducts = async (req, res) => {
  try {
    const { productName, productWeight, productCalories, date } = req.body;
    const newDate = new Date(date);
    const dateFormatted = newDate.toISOString().split('T')[0];

    if (!productName || !productWeight || !productCalories || !date) {
      return res.status(400).json({ message: 'Tüm alanlar gereklidir!' });
    }

    const newProduct = new MyProducts({
      productInfo: [
        {
          productName,
          productWeight,
          productCalories,
        },
      ],
      date: dateFormatted,
    });

    await newProduct.save();

    res.status(201).json({
      message: 'Ürün eklendi!',
      product: newProduct,
    });
  } catch (error) {
    res.status(500).json({ message: 'Sunucu hatası', error: error.message });
  }
};

export { addMyProducts };
