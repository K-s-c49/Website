import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { toast } from 'sonner';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { formatCurrency, getImageUrl } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { ProductForm } from '../components/ProductForm';
import {
  fetchProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from '@/features/products/productSlice';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';

export function AdminProductsPage() {
  const dispatch = useAppDispatch();
  const { items: products, status } = useAppSelector((state) => state.products);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (status === 'idle' || products.length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch, status, products.length]);

  const handleAddProduct = () => {
    setEditingProduct(null);
    setIsDialogOpen(true);
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setIsDialogOpen(true);
  };

  const handleDeleteProduct = (product) => {
    setDeleteConfirm(product);
  };

  const confirmDelete = async () => {
    if (!deleteConfirm) return;

    const productId = deleteConfirm.id ?? deleteConfirm._id;
    try {
      await dispatch(deleteProduct(productId)).unwrap();
      toast.success('Product deleted', { description: `${deleteConfirm.name} has been removed.` });
      setDeleteConfirm(null);
      // Refresh products list
      dispatch(fetchProducts());
    } catch (error) {
      toast.error('Failed to delete product', { description: error || 'An error occurred' });
    }
  };

  const handleFormSubmit = async (formData, config) => {
    setIsSubmitting(true);
    try {
      if (editingProduct) {
        // Update existing product - send FormData to support image uploads
        const productId = editingProduct.id ?? editingProduct._id;
        await dispatch(updateProduct({ id: productId, formData, config })).unwrap();
        toast.success('Product updated', { description: 'Product has been updated successfully.' });
      } else {
        // Create new product
        await dispatch(createProduct({ formData, config })).unwrap();
        toast.success('Product created', { description: 'New product has been added successfully.' });
      }
      setIsDialogOpen(false);
      setEditingProduct(null);
      // Refresh products list
      dispatch(fetchProducts());
    } catch (error) {
      toast.error(editingProduct ? 'Failed to update product' : 'Failed to create product', {
        description: error || 'An error occurred',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">Products</h1>
        <p className="text-sm text-slate-500">Manage catalog content, availability, and merchandising tags.</p>
      </div>
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between pb-4">
          <h2 className="text-lg font-semibold text-slate-900">Catalog</h2>
          <Button onClick={handleAddProduct}>Add product</Button>
        </div>
        {status === 'loading' && products.length === 0 ? (
          <LoadingSpinner label="Loading products..." />
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Tags</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-slate-500">
                    No products found. Click "Add product" to create your first product.
                  </TableCell>
                </TableRow>
              ) : (
                products.map((product) => (
                  <TableRow key={product.id ?? product._id}>
                    <TableCell>
                      {product.images?.[0] ? (
                        <img
                          src={getImageUrl(product.images[0])}
                          alt={product.name}
                          className="h-12 w-12 rounded-md object-cover"
                          onError={(e) => {
                            e.target.src = '/images/products/logo.jpg';
                          }}
                        />
                      ) : (
                        <div className="h-12 w-12 rounded-md bg-slate-200 flex items-center justify-center text-xs text-slate-400">
                          No img
                        </div>
                      )}
                    </TableCell>
                    <TableCell className="font-medium text-slate-900">{product.name}</TableCell>
                    <TableCell className="capitalize text-slate-600">{product.category || '-'}</TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span>{formatCurrency(product.salePrice ?? product.price)}</span>
                        {product.salePrice && (
                          <span className="text-xs text-slate-400 line-through">
                            {formatCurrency(product.price)}
                          </span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className={product.stock > 0 ? 'text-green-600' : 'text-red-600'}>
                        {product.stock || 0}
                      </span>
                    </TableCell>
                    <TableCell className="space-x-2">
                      {product.badges?.length > 0 ? (
                        product.badges.map((badge) => (
                          <Badge key={badge} variant="outline">
                            {badge}
                          </Badge>
                        ))
                      ) : (
                        <span className="text-sm text-slate-400">-</span>
                      )}
                    </TableCell>
                    <TableCell className="flex items-center justify-end gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEditProduct(product)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-500 hover:text-red-600"
                        onClick={() => handleDeleteProduct(product)}
                      >
                        Archive
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        )}
      </div>

      {/* Add/Edit Product Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingProduct ? 'Edit Product' : 'Add New Product'}</DialogTitle>
            <DialogDescription>
              {editingProduct
                ? 'Update the product information below.'
                : 'Fill in the details to create a new product.'}
            </DialogDescription>
          </DialogHeader>
          <ProductForm
            product={editingProduct}
            onSubmit={handleFormSubmit}
            isSubmitting={isSubmitting}
            onCancel={() => {
              setIsDialogOpen(false);
              setEditingProduct(null);
            }}
          />
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={!!deleteConfirm} onOpenChange={(open) => !open && setDeleteConfirm(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Archive Product</DialogTitle>
            <DialogDescription>
              Are you sure you want to archive "{deleteConfirm?.name}"? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center justify-end gap-3 mt-6">
            <Button variant="outline" onClick={() => setDeleteConfirm(null)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Archive
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
