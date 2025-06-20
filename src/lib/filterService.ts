import type { NBNPlan, SpeedRange, PriceRangeObject } from '@/types/nbn';

export interface PlansFilters {
  providers?: string[];
  priceRange?: PriceRangeObject;
  downloadSpeed?: SpeedRange;
  uploadSpeed?: SpeedRange;
  nbnType?: string;
  hasPromotion?: boolean;
}

// Client-side filtering
export function filterPlans(
  plans: NBNPlan[],
  filters: PlansFilters = {}
): NBNPlan[] {
  let filteredPlans = [...plans];

  // Apply filters
  if (filters.providers && filters.providers.length > 0) {
    filteredPlans = filteredPlans.filter(plan => 
      filters.providers!.includes(plan.provider)
    );
  }

  if (filters.priceRange) {
    const [minPrice, maxPrice] = filters.priceRange.range;
    filteredPlans = filteredPlans.filter(plan => 
      plan.price >= minPrice && plan.price <= maxPrice
    );
  }

  if (filters.downloadSpeed) {
    const [minSpeed, maxSpeed] = filters.downloadSpeed.range;
    filteredPlans = filteredPlans.filter(plan => 
      parseInt(plan.downloadSpeed) >= minSpeed && parseInt(plan.downloadSpeed) <= maxSpeed
    );
  }

  if (filters.uploadSpeed) {
    const [minSpeed, maxSpeed] = filters.uploadSpeed.range;
    filteredPlans = filteredPlans.filter(plan => 
      parseInt(plan.uploadSpeed) >= minSpeed && parseInt(plan.uploadSpeed) <= maxSpeed
    );
  }

  if (filters.nbnType) {
    filteredPlans = filteredPlans.filter(plan => 
      plan.type === filters.nbnType
    );
  }

  if (filters.hasPromotion) {
    filteredPlans = filteredPlans.filter(plan => 
      !!plan.promotion
    );
  }

  return filteredPlans;
} 