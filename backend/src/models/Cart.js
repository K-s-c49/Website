import mongoose from 'mongoose';

const { Schema } = mongoose;

const cartItemSchema = new Schema(
  {
    product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, default: 1 },
  },
  { _id: false },
);

const cartSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    items: [cartItemSchema],
    updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true },
);

export const Cart = mongoose.model('Cart', cartSchema);




