import { useState, useEffect, useMemo, useReducer } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Sort } from './Sort';
import { Filters } from './Filters';
import { PlansList } from './PlansList';
import {
  filterAndSortPlans,
  paginatePlans,
  type PlansFilters,
  type PlansSort,
} from '@/lib/nbnService';
import { APP_SETTINGS } from '@/lib/settings';
import type { NBNPlan, FilterAction } from '@/types/nbn';

interface PlansViewControlProps {
  dataFilAddr: NBNPlan[];
}

// Initial filter state with all fields defined
const initialFilterState: PlansFilters = {
  providers: undefined,
  priceRange: undefined,
  downloadSpeed: undefined,
  uploadSpeed: undefined,
  nbnType: undefined,
  hasPromotion: undefined,
};

// Filter reducer function
function filterReducer(state: PlansFilters, action: FilterAction): PlansFilters {
  switch (action.type) {
    case 'SET_PROVIDERS':
      return { ...state, providers: action.payload.length > 0 ? action.payload : undefined };
    case 'SET_PRICE_RANGE':
      return { ...state, priceRange: action.payload };
    case 'SET_DOWNLOAD_SPEED':
      return { ...state, downloadSpeed: action.payload };
    case 'SET_UPLOAD_SPEED':
      return { ...state, uploadSpeed: action.payload };
    case 'SET_NBN_TYPE':
      return { ...state, nbnType: action.payload };
    case 'SET_HAS_PROMOTION':
      return { ...state, hasPromotion: action.payload };
    case 'CLEAR_ALL':
      return initialFilterState;
    default:
      return state;
  }
}

export function PlansViewControl({ dataFilAddr }: PlansViewControlProps) {
  // (3) state: sort = list of str (only 1 sort at a time)
  const [sort, setSort] = useState<PlansSort | undefined>(undefined);

  // (4) state: filter = useReducer (keep simple = 1 value each filter)
  const [filters, dispatchFilters] = useReducer(filterReducer, initialFilterState);

  // (2) state: dataPlans = optimised([ ...dataFilAddr ])
  // deps: sort, filters
  const dataPlans = useMemo(() => {
    return filterAndSortPlans(dataFilAddr, filters, sort);
  }, [dataFilAddr, filters, sort]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-2 sm:gap-6">
      <div className="lg:col-span-8 order-2 lg:order-1">
        <Card className="bg-white border border-gray-200 shadow-sm">
          <CardContent className="">
            <Sort sort={sort} setSort={setSort} totalPlans={dataPlans.length} />

            <PlansList dataPlans={dataPlans} />
          </CardContent>
        </Card>
      </div>

      <div className="lg:col-span-4 order-1 lg:order-2">
        <Filters filters={filters} dispatchFilters={dispatchFilters} />
      </div>
    </div>
  );
}
