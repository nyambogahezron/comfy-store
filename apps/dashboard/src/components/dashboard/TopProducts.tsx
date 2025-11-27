import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const topProducts = [
  { name: 'Modern Oak Dining Table', sales: 124, revenue: 161249, trend: 'up' },
  { name: 'Velvet Accent Chair', sales: 98, revenue: 58799, trend: 'up' },
  { name: 'Upholstered King Bed', sales: 76, revenue: 144399, trend: 'down' },
  { name: 'Marble Coffee Table', sales: 65, revenue: 58499, trend: 'up' },
  { name: 'Industrial Bookshelf', sales: 54, revenue: 24299, trend: 'up' },
];

export const TopProducts = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Products</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {topProducts.map((product, index) => (
            <div key={product.name} className="flex items-center gap-4">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-sm font-semibold text-primary">
                {index + 1}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">{product.name}</p>
                <p className="text-sm text-muted-foreground">{product.sales} sales</p>
              </div>
              <div className="text-right">
                <p className="font-semibold">${product.revenue.toLocaleString()}</p>
                <Badge variant={product.trend === 'up' ? 'default' : 'secondary'} className="mt-1">
                  {product.trend === 'up' ? '↑' : '↓'}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
