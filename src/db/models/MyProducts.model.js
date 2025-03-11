import mongoose from 'mongoose';

const myProductSchema = new mongoose.Schema({
  productInfo: [
    {
      productWeight: {
        type: Number,
      },
      productCalories: {
        type: Number,
      },
      productName: {
        type: String,
        required: [true, 'productName is required'],
      },
    },
  ],
  date: {
    type: Date,
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
