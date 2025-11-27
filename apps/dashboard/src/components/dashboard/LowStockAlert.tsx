import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle } from 'lucide-react';
import { useEffect, useState } from 'react';
import { getProducts } from '@/lib/localStorage';
import { Product } from '@/types';

export const LowStockAlert = () => {
  const [lowStockProducts, setLowStockProducts] = useState<Product[]>([]);

  useEffect(() => {
    const products = getProducts();
    const low = products.filter(p => p.stock < 10).sort((a, b) => a.stock - b.stock);
    setLowStockProducts(low);
  }, []);

  if (lowStockProducts.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle size={20} className="text-warning" />
            Low Stock Alert
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">All products are well stocked!</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle size={20} className="text-warning" />
          Low Stock Alert
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {lowStockProducts.slice(0, 5).map((product) => (
            <div key={product.id} className="flex items-center justify-between">
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">{product.name}</p>
                <p className="text-sm text-muted-foreground">{product.category}</p>
              </div>
              <Badge variant={product.stock < 5 ? 'destructive' : 'secondary'}>
                {product.stock} left
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
