import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { getProducts, getCategories, addProduct, updateProduct, initializeStorage } from '@/lib/localStorage';
import { Product } from '@/types';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft } from 'lucide-react';

const productSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  category: z.string().min(1, 'Category is required'),
  price: z.number().min(0, 'Price must be positive'),
  discount: z.number().min(0).max(100),
  stock: z.number().min(0, 'Stock cannot be negative'),
  materials: z.string(),
  width: z.number().min(0),
  height: z.number().min(0),
  depth: z.number().min(0),
  status: z.enum(['active', 'draft']),
});

type ProductFormData = z.infer<typeof productSchema>;

const ProductForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [categories, setCategories] = useState<string[]>([]);
  const isEditing = id && id !== 'new';

  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: '',
      description: '',
      category: '',
      price: 0,
      discount: 0,
      stock: 0,
      materials: '',
      width: 0,
      height: 0,
      depth: 0,
      status: 'active',
    },
  });

  useEffect(() => {
    initializeStorage();
    const cats = getCategories();
    setCategories(cats.map(c => c.name.toLowerCase().replace(' ', '-')));

    if (isEditing) {
      const products = getProducts();
      const product = products.find(p => p.id === id);
      if (product) {
        setValue('name', product.name);
        setValue('description', product.description);
        setValue('category', product.category);
        setValue('price', product.price);
        setValue('discount', product.discount);
        setValue('stock', product.stock);
        setValue('materials', product.materials.join(', '));
        setValue('width', product.dimensions.width);
        setValue('height', product.dimensions.height);
        setValue('depth', product.dimensions.depth);
        setValue('status', product.status);
      }
    }
  }, [id, isEditing, setValue]);

  const onSubmit = (data: ProductFormData) => {
    const product: Product = {
      id: isEditing ? id! : Date.now().toString(),
      name: data.name,
      description: data.description,
      category: data.category,
      price: data.price,
      discount: data.discount,
      stock: data.stock,
      images: ['/placeholder.svg'],
      materials: data.materials.split(',').map(m => m.trim()),
      dimensions: {
        width: data.width,
        height: data.height,
        depth: data.depth,
      },
      status: data.status,
      createdAt: isEditing ? getProducts().find(p => p.id === id)?.createdAt || new Date().toISOString() : new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    if (isEditing) {
      updateProduct(id!, product);
      toast({
        title: 'Product updated',
        description: 'Your product has been updated successfully.',
      });
    } else {
      addProduct(product);
      toast({
        title: 'Product created',
        description: 'Your product has been added to inventory.',
      });
    }

    navigate('/products');
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate('/products')}>
            <ArrowLeft size={20} />
          </Button>
          <div>
            <h1 className="text-3xl font-bold">{isEditing ? 'Edit Product' : 'New Product'}</h1>
            <p className="text-muted-foreground mt-1">
              {isEditing ? 'Update product details' : 'Add a new product to your inventory'}
            </p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="name">Product Name</Label>
                <Input id="name" {...register('name')} />
                {errors.name && <p className="text-sm text-destructive mt-1">{errors.name.message}</p>}
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" {...register('description')} rows={4} />
                {errors.description && <p className="text-sm text-destructive mt-1">{errors.description.message}</p>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select onValueChange={(value) => setValue('category', value)} value={watch('category')}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(cat => (
                        <SelectItem key={cat} value={cat} className="capitalize">
                          {cat.replace('-', ' ')}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.category && <p className="text-sm text-destructive mt-1">{errors.category.message}</p>}
                </div>

                <div>
                  <Label htmlFor="status">Status</Label>
                  <Select onValueChange={(value: 'active' | 'draft') => setValue('status', value)} value={watch('status')}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="draft">Draft</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Pricing & Stock */}
          <Card>
            <CardHeader>
              <CardTitle>Pricing & Stock</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="price">Price ($)</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    {...register('price', { valueAsNumber: true })}
                  />
                  {errors.price && <p className="text-sm text-destructive mt-1">{errors.price.message}</p>}
                </div>

                <div>
                  <Label htmlFor="discount">Discount (%)</Label>
                  <Input
                    id="discount"
                    type="number"
                    {...register('discount', { valueAsNumber: true })}
                  />
                  {errors.discount && <p className="text-sm text-destructive mt-1">{errors.discount.message}</p>}
                </div>

                <div>
                  <Label htmlFor="stock">Stock</Label>
                  <Input
                    id="stock"
                    type="number"
                    {...register('stock', { valueAsNumber: true })}
                  />
                  {errors.stock && <p className="text-sm text-destructive mt-1">{errors.stock.message}</p>}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Product Details */}
          <Card>
            <CardHeader>
              <CardTitle>Product Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="materials">Materials (comma separated)</Label>
                <Input id="materials" {...register('materials')} placeholder="Oak, Steel, Fabric" />
                {errors.materials && <p className="text-sm text-destructive mt-1">{errors.materials.message}</p>}
              </div>

              <div>
                <Label>Dimensions (cm)</Label>
                <div className="grid grid-cols-3 gap-4 mt-2">
                  <div>
                    <Input
                      type="number"
                      placeholder="Width"
                      {...register('width', { valueAsNumber: true })}
                    />
                  </div>
                  <div>
                    <Input
                      type="number"
                      placeholder="Height"
                      {...register('height', { valueAsNumber: true })}
                    />
                  </div>
                  <div>
                    <Input
                      type="number"
                      placeholder="Depth"
                      {...register('depth', { valueAsNumber: true })}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex justify-end gap-4">
            <Button type="button" variant="outline" onClick={() => navigate('/products')}>
              Cancel
            </Button>
            <Button type="submit">
              {isEditing ? 'Update Product' : 'Create Product'}
            </Button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default ProductForm;
