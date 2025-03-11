import { MyProducts } from '../../db/models/MyProducts.model.js';

const countCalories = async (req, res) => {
  try {
    const { date } = req.query;
    const newDate = new Date(date);
    const dateFormatted = newDate.toISOString().split('T')[0];

    if (!date) {
      return res.status(400).json({ message: 'bir tarih belirtin!' });
    }

    const products = await MyProducts.find({ date: dateFormatted });

    if (!products.length) {
      return res
        .status(404)
        .json({ message: 'Bu tarihte kayıtlı ürün bulunamadı!' });
    }

    const totalCalories = products.reduce((acc, product) => {
      const productCalories = product.productInfo.reduce(
        (sum, info) => sum + Number(info.productCalories),
        0,
      );
      return acc + productCalories;
    }, 0);

    res.status(200).json({
      message: 'Toplam kalori hesaplandı!',
      date,
      totalCalories,
    });
  } catch (error) {
    res.status(500).json({ message: 'Sunucu hatası', error: error.message });
  }
};

export { countCalories };
