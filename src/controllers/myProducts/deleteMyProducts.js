import createHttpError from 'http-errors';
import { MyProducts } from '../../db/models/MyProducts.model.js';
import mongoose from 'mongoose';

const deleteMyProducts = async (req, res) => {
  const { id } = req.params;
  const owner = req.user._id;

  if (!mongoose.Types.ObjectId.isValid(id))
    throw createHttpError(400, `Invalid ID: ${id}`);

  const deletedProduct = await MyProducts.findOneAndDelete({ _id: id, owner });

  if (!deletedProduct) {
    return res.status(404).json({ message: 'No product found with this id!' });
  }

  res.status(204).json({ message: 'Product deleted!', deletedProduct });
};

export { deleteMyProducts };
