import { LucideIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string;
  change: number;
  icon: LucideIcon;
  trend?: 'up' | 'down';
}

export const StatCard = ({ title, value, change, icon: Icon, trend = 'up' }: StatCardProps) => {
  const isPositive = change > 0;
  const changeColor = isPositive ? 'text-success' : 'text-destructive';

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <h3 className="text-2xl font-bold mt-2">{value}</h3>
            <p className={cn("text-sm mt-2", changeColor)}>
              {isPositive ? '↑' : '↓'} {Math.abs(change)}% from last month
            </p>
          </div>
          <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
            <Icon size={24} className="text-primary" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
