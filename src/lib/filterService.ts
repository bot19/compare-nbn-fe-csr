import type { NBNPlan } from '@/types/nbn';

export interface PlansFilters {
  providers?: string[];
  priceRange?: string;
  downloadSpeed?: string;
  uploadSpeed?: string;
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
    // Parse price range (e.g., "$50-$80" -> min: 50, max: 80)
    const priceMatch = filters.priceRange.match(/\$(\d+)-?\$?(\d+)?/);
    if (priceMatch) {
      const minPrice = parseInt(priceMatch[1]);
      const maxPrice = priceMatch[2] ? parseInt(priceMatch[2]) : Infinity;
      filteredPlans = filteredPlans.filter(plan => 
        plan.price >= minPrice && plan.price <= maxPrice
      );
    }
  }

  if (filters.downloadSpeed) {
    const speed = parseInt(filters.downloadSpeed);
    filteredPlans = filteredPlans.filter(plan => 
      parseInt(plan.downloadSpeed) >= speed
    );
  }

  if (filters.uploadSpeed) {
    const speed = parseInt(filters.uploadSpeed);
    filteredPlans = filteredPlans.filter(plan => 
      parseInt(plan.uploadSpeed) >= speed
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