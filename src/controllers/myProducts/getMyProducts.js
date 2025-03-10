import { MyProducts } from '../../db/models/MyProducts.model.js';

const getMyProducts = async (req, res) => {
  try {
    const { date } = req.query;

    let products;
    if (date) {
      products = await MyProducts.find({ date });
    } else {
      products = await MyProducts.find();
    }

    res.status(200).json({ message: 'Ürünler başarıyla getirildi!', products });
  } catch (error) {
    res.status(500).json({ message: 'Sunucu hatası', error: error.message });
  }
};

export { getMyProducts };
