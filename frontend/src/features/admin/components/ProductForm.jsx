import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { getImageUrl } from '@/lib/utils';

const productSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().min(1, 'Description is required'),
  price: z.coerce.number().positive('Price must be positive'),
  salePrice: z.coerce.number().positive('Sale price must be positive').optional().or(z.literal('')),
  stock: z.coerce.number().int().min(0, 'Stock must be 0 or greater'),
  category: z.string().min(1, 'Category is required'),
  brand: z.string().optional(),
});

const categories = [
  { value: 'electronics', label: 'Electronics' },
  { value: 'fashion', label: 'Fashion' },
  { value: 'home', label: 'Home' },
  { value: 'sports', label: 'Sports' },
  { value: 'books', label: 'Books' },
  { value: 'toys', label: 'Toys' },
];

export function ProductForm({ product, onSubmit, isSubmitting, onCancel }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm({
    resolver: zodResolver(productSchema),
    defaultValues: product || {
      name: '',
      description: '',
      price: '',
      salePrice: '',
      stock: 0,
      category: '',
      brand: '',
    },
  });

  useEffect(() => {
    if (product) {
      reset({
        name: product.name || '',
        description: product.description || '',
        price: product.price || '',
        salePrice: product.salePrice || '',
        stock: product.stock || 0,
        category: product.category || '',
        brand: product.brand || '',
      });
    }
  }, [product, reset]);

  const [imageFiles, setImageFiles] = React.useState([]);
  const [imagePreviews, setImagePreviews] = React.useState([]);
  const [newImagePreviews, setNewImagePreviews] = React.useState([]);

  useEffect(() => {
    if (product?.images && product.images.length > 0) {
      setImagePreviews(product.images);
    } else {
      setImagePreviews([]);
    }
    setImageFiles([]);
    setNewImagePreviews([]);
  }, [product]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImageFiles((prev) => [...prev, ...files]);
    
    const previews = files.map((file) => URL.createObjectURL(file));
    setNewImagePreviews((prev) => [...prev, ...previews]);
  };

  const removeImage = (index) => {
    // Check if it's an existing image or a new one
    if (index < imagePreviews.length) {
      // Removing existing image
      setImagePreviews((prev) => prev.filter((_, i) => i !== index));
    } else {
      // Removing new image
      const newIndex = index - imagePreviews.length;
      setNewImagePreviews((prev) => prev.filter((_, i) => i !== newIndex));
      setImageFiles((prev) => prev.filter((_, i) => i !== newIndex));
    }
  };

  const onFormSubmit = (data) => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('description', data.description);
    formData.append('price', data.price);
    if (data.salePrice) {
      formData.append('salePrice', data.salePrice);
    }
    formData.append('stock', data.stock);
    formData.append('category', data.category);
    if (data.brand) {
      formData.append('brand', data.brand);
    }

    // For updates, send existing images that are still in previews (not removed)
    if (product && imagePreviews.length > 0) {
      const remainingExistingImages = imagePreviews.filter(
        (preview) => preview.startsWith('http') || preview.startsWith('/'),
      );
      if (remainingExistingImages.length > 0) {
        formData.append('existingImages', JSON.stringify(remainingExistingImages));
      }
    }

    // Add new image files
    imageFiles.forEach((file) => {
      formData.append('images', file);
    });

    onSubmit(formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="flex flex-col gap-2">
          <Label htmlFor="name">Product Name *</Label>
          <Input id="name" {...register('name')} placeholder="Enter product name" />
          {errors.name && <p className="text-sm text-red-600">{errors.name.message}</p>}
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="category">Category *</Label>
          <select
            id="category"
            {...register('category')}
            className="flex h-11 w-full rounded-md border border-slate-200 bg-white px-4 py-2 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
          >
            <option value="">Select category</option>
            {categories.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>
          {errors.category && <p className="text-sm text-red-600">{errors.category.message}</p>}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="description">Description *</Label>
        <Textarea
          id="description"
          {...register('description')}
          placeholder="Enter product description"
          rows={4}
        />
        {errors.description && <p className="text-sm text-red-600">{errors.description.message}</p>}
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="flex flex-col gap-2">
          <Label htmlFor="price">Price (₹) *</Label>
          <Input
            id="price"
            type="number"
            step="0.01"
            {...register('price')}
            placeholder="0.00"
          />
          {errors.price && <p className="text-sm text-red-600">{errors.price.message}</p>}
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="salePrice">Sale Price (₹)</Label>
          <Input
            id="salePrice"
            type="number"
            step="0.01"
            {...register('salePrice')}
            placeholder="Optional"
          />
          {errors.salePrice && <p className="text-sm text-red-600">{errors.salePrice.message}</p>}
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="stock">Stock *</Label>
          <Input
            id="stock"
            type="number"
            {...register('stock')}
            placeholder="0"
          />
          {errors.stock && <p className="text-sm text-red-600">{errors.stock.message}</p>}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="brand">Brand</Label>
        <Input id="brand" {...register('brand')} placeholder="Optional" />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="images">Product Images</Label>
        <Input
          id="images"
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageChange}
          className="cursor-pointer"
        />
        {(imagePreviews.length > 0 || newImagePreviews.length > 0) && (
          <div className="mt-2 grid grid-cols-4 gap-2">
            {imagePreviews.map((preview, index) => (
              <div key={`existing-${index}`} className="relative">
                <img
                  src={getImageUrl(preview)}
                  alt={`Preview ${index + 1}`}
                  className="h-20 w-full rounded-md object-cover"
                  onError={(e) => {
                    e.target.src = '/images/products/logo.jpg';
                  }}
                />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute right-1 top-1 rounded-full bg-red-500 p-1 text-white hover:bg-red-600"
                >
                  ×
                </button>
              </div>
            ))}
            {newImagePreviews.map((preview, index) => (
              <div key={`new-${index}`} className="relative">
                <img
                  src={preview}
                  alt={`New preview ${index + 1}`}
                  className="h-20 w-full rounded-md object-cover"
                />
                <button
                  type="button"
                  onClick={() => removeImage(imagePreviews.length + index)}
                  className="absolute right-1 top-1 rounded-full bg-red-500 p-1 text-white hover:bg-red-600"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex items-center justify-end gap-3 pt-4">
        <Button type="button" variant="outline" onClick={onCancel} disabled={isSubmitting}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Saving...' : product ? 'Update Product' : 'Create Product'}
        </Button>
      </div>
    </form>
  );
}

