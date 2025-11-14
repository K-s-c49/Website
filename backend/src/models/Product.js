import mongoose from 'mongoose';

const { Schema } = mongoose;

const productSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    salePrice: { type: Number },
    stock: { type: Number, default: 0 },
    category: { type: String, index: true },
    brand: { type: String },
    images: [String],
    isFeatured: { type: Boolean, default: false },
    metadata: { type: Map, of: String },
  },
  { timestamps: true },
);

productSchema.index({ name: 'text', description: 'text' });

export const Product = mongoose.model('Product', productSchema);




