import { useState, useEffect, useMemo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import { SortComponent } from './SortComponent';
import { FiltersComponent } from './FiltersComponent';
import { PlansList } from './PlansList';
import {
  filterAndSortPlans,
  paginatePlans,
  type PlansFilters,
  type PlansSort,
} from '@/lib/nbnService';
import { APP_SETTINGS } from '@/lib/settings';
import type { NBNPlan } from '@/types/nbn';

interface PlansViewControlProps {
  dataFilAddr: NBNPlan[];
  sort: PlansSort;
  filters: PlansFilters;
  currentPage: number;
  onSortChange: (sort: PlansSort) => void;
  onFiltersChange: (filters: PlansFilters) => void;
  onPageChange: (page: number) => void;
}

export function PlansViewControl({
  dataFilAddr,
  sort,
  filters,
  currentPage,
  onSortChange,
  onFiltersChange,
  onPageChange,
}: PlansViewControlProps) {
  // Client-side filtering and sorting
  const dataPlans = useMemo(() => {
    return filterAndSortPlans(dataFilAddr, filters, sort);
  }, [dataFilAddr, filters, sort]);

  // Pagination
  const paginatedData = useMemo(() => {
    return paginatePlans(dataPlans, currentPage, APP_SETTINGS.ITEMS_PER_PAGE);
  }, [dataPlans, currentPage]);

  // Reset to page 1 when filters or sort change
  useEffect(() => {
    if (currentPage > 1) {
      onPageChange(1);
    }
  }, [filters, sort, currentPage, onPageChange]);

  return (
    <Card className="bg-white border border-gray-200 shadow-sm">
      <CardContent className="">
        <SortComponent sort={sort} onSortChange={onSortChange} totalPlans={dataPlans.length} />

        <PlansList
          plans={paginatedData.plans}
          currentPage={paginatedData.page}
          totalPages={paginatedData.totalPages}
          hasNextPage={paginatedData.hasNextPage}
          hasPrevPage={paginatedData.hasPrevPage}
          onPageChange={onPageChange}
        />
      </CardContent>
    </Card>
  );
}
