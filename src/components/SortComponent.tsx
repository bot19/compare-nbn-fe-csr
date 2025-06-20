import { Button } from '@/components/ui/button';
import type { PlansSort } from '@/lib/nbnService';

interface SortComponentProps {
  sort: PlansSort;
  onSortChange: (sort: PlansSort) => void;
  totalPlans: number;
}

export function SortComponent({ sort, onSortChange, totalPlans }: SortComponentProps) {
  return (
    <div className="flex flex-wrap gap-2 mb-4 items-center p-3 bg-white rounded-md border border-gray-200 shadow-sm">
      <span className="text-sm text-gray-600">Sort:</span>
      <Button
        variant="outline"
        size="sm"
        className={`border-gray-300 ${
          sort.field === 'price' && sort.direction === 'asc' ? 'bg-blue-50 border-blue-300' : ''
        }`}
        onClick={() => onSortChange({ field: 'price', direction: 'asc' })}
      >
        Price
      </Button>
      <Button
        variant="outline"
        size="sm"
        className={`border-gray-300 ${
          sort.field === 'downloadSpeed' && sort.direction === 'asc'
            ? 'bg-blue-50 border-blue-300'
            : ''
        }`}
        onClick={() => onSortChange({ field: 'downloadSpeed', direction: 'asc' })}
      >
        Speed ↑
      </Button>
      <Button
        variant="outline"
        size="sm"
        className={`border-gray-300 ${
          sort.field === 'downloadSpeed' && sort.direction === 'desc'
            ? 'bg-blue-50 border-blue-300'
            : ''
        }`}
        onClick={() => onSortChange({ field: 'downloadSpeed', direction: 'desc' })}
      >
        Speed ↓
      </Button>
      <span className="text-sm text-gray-500 ml-auto">{totalPlans} plans</span>
    </div>
  );
}
