import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { formatCurrency } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { fetchProducts } from '@/features/products/productSlice';

export function AdminProductsPage() {
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.products.items);

  useEffect(() => {
    if (!products.length) {
      dispatch(fetchProducts());
    }
  }, [dispatch, products.length]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">Products</h1>
        <p className="text-sm text-slate-500">Manage catalog content, availability, and merchandising tags.</p>
      </div>
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between pb-4">
          <h2 className="text-lg font-semibold text-slate-900">Catalog</h2>
          <Button>Add product</Button>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Tags</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id ?? product._id}>
                <TableCell className="font-medium text-slate-900">{product.name}</TableCell>
                <TableCell className="capitalize text-slate-600">{product.category}</TableCell>
                <TableCell>{formatCurrency(product.price)}</TableCell>
                <TableCell>{product.stock}</TableCell>
                <TableCell className="space-x-2">
                  {product.badges?.map((badge) => (
                    <Badge key={badge} variant="outline">
                      {badge}
                    </Badge>
                  ))}
                </TableCell>
                <TableCell className="flex items-center justify-end gap-2">
                  <Button variant="outline" size="sm">
                    Edit
                  </Button>
                  <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600">
                    Archive
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

