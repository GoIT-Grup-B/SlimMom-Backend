import mongoose from 'mongoose';

const myProductSchema = new mongoose.Schema({
  productInfo: [
    {
      productWeight: {
        type: String,
      },
      productCalories: {
        type: String,
      },
      productName: {
        type: String,
        required: [true, 'productName is required'],
      },
    },
  ],
  date: {
    type: String,
    required: [true, 'Date is required'],
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: false, //  Test için required=false yaptık, sonra true'ya alabiliriz.
    ref: 'user',
  },
});

const MyProducts = mongoose.model('myproducts', myProductSchema);
export { MyProducts };
