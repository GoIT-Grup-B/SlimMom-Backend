import { Schema, model } from 'mongoose';

const productSchema = new Schema(
  {
    categories: {
      type: string,
      required: true,
    },
    weight: {
      type: number,
      required: true,
    },
    title: {
      type: string,
      required: true,
    },
    calories: {
      type: number,
      required: true,
    },
    groupBloodTypeNotAllowed: {
      1: { type: Boolean, required: true },
      2: { type: Boolean, required: true },
      3: { type: Boolean, required: true },
      4: { type: Boolean, required: true },
    },
  },
  {
    timestamps: false,
    versionKey: false,
  },
);

const Product = model('product', productSchema);
