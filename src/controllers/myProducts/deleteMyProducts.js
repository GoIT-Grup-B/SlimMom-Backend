import { MyProducts } from '../../db/models/MyProducts.model.js';

const deleteMyProducts = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedProduct = await MyProducts.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({ message: 'Ürün bulunamadı!' });
    }

    res.status(200).json({ message: 'Ürün silindi!', deletedProduct });
  } catch (error) {
    res.status(500).json({ message: 'Sunucu hatası', error: error.message });
  }
};

export { deleteMyProducts };
