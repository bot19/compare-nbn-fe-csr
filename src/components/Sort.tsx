import { Button } from '@/components/ui/button';
import { ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';
import type { PlansSort } from '@/lib/nbnService';

interface SortProps {
  sort: PlansSort | undefined;
  setSort: React.Dispatch<React.SetStateAction<PlansSort | undefined>>;
  totalPlans: number;
}

export function Sort({ sort, setSort, totalPlans }: SortProps) {
  const getSortIcon = (field: PlansSort['field']) => {
    if (!sort || sort.field !== field) return <ArrowUpDown className="h-4 w-4" />;
    return sort.direction === 'asc' ? (
      <ArrowUp className="h-4 w-4" />
    ) : (
      <ArrowDown className="h-4 w-4" />
    );
  };

  const handleSortClick = (field: PlansSort['field']) => {
    if (sort?.field === field) {
      // Toggle direction if same field
      setSort((prev) =>
        prev ? { ...prev, direction: prev.direction === 'asc' ? 'desc' : 'asc' } : undefined
      );
    } else {
      // Set new field with default desc direction
      setSort({ field, direction: 'desc' });
    }
  };

  const handleReset = () => {
    setSort(undefined);
  };

  return (
    <div className="flex flex-wrap gap-2 mb-4 items-center p-3 bg-white rounded-md border border-gray-200 shadow-sm">
      <span className="text-sm text-gray-600">Sort:</span>

      <Button
        variant="outline"
        size="sm"
        className={`border-gray-300 flex items-center gap-1 ${
          sort?.field === 'price' ? 'bg-blue-50 border-blue-300' : ''
        }`}
        onClick={() => handleSortClick('price')}
      >
        Price {getSortIcon('price')}
      </Button>

      <Button
        variant="outline"
        size="sm"
        className={`border-gray-300 flex items-center gap-1 ${
          sort?.field === 'downloadSpeed' ? 'bg-blue-50 border-blue-300' : ''
        }`}
        onClick={() => handleSortClick('downloadSpeed')}
      >
        Download {getSortIcon('downloadSpeed')}
      </Button>

      <Button
        variant="outline"
        size="sm"
        className={`border-gray-300 flex items-center gap-1 ${
          sort?.field === 'uploadSpeed' ? 'bg-blue-50 border-blue-300' : ''
        }`}
        onClick={() => handleSortClick('uploadSpeed')}
      >
        Upload {getSortIcon('uploadSpeed')}
      </Button>

      <Button variant="outline" size="sm" className="border-gray-300" onClick={handleReset}>
        Reset
      </Button>

      <span className="text-sm text-gray-500 ml-auto">{totalPlans} plans</span>
    </div>
  );
}
