import { nbnPlansData } from '@/data/nbnPlans';
import { APP_SETTINGS } from './settings';
import type { NBNPlan } from '@/types/nbn';

export interface PlansResponse {
  plans: NBNPlan[];
  total: number;
  page: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface PlansFilters {
  providers?: string[];
  priceRange?: string;
  downloadSpeed?: string;
  uploadSpeed?: string;
  nbnType?: string;
  hasPromotion?: boolean;
}

export interface PlansSort {
  field: 'price' | 'downloadSpeed' | 'uploadSpeed';
  direction: 'asc' | 'desc';
}

export async function fetchNBNPlans(
  page: number = 1,
  itemsPerPage: number = APP_SETTINGS.ITEMS_PER_PAGE,
  filters: PlansFilters = {},
  sort: PlansSort = { field: 'price', direction: 'asc' }
): Promise<PlansResponse> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, APP_SETTINGS.DATA_LOADING_DELAY_MS));

  let filteredPlans = [...nbnPlansData.plans];

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

  // Apply sorting
  filteredPlans.sort((a, b) => {
    let aValue: number;
    let bValue: number;

    switch (sort.field) {
      case 'price':
        aValue = a.price;
        bValue = b.price;
        break;
      case 'downloadSpeed':
        aValue = parseInt(a.downloadSpeed);
        bValue = parseInt(b.downloadSpeed);
        break;
      case 'uploadSpeed':
        aValue = parseInt(a.uploadSpeed);
        bValue = parseInt(b.uploadSpeed);
        break;
      default:
        aValue = a.price;
        bValue = b.price;
    }

    if (sort.direction === 'asc') {
      return aValue - bValue;
    } else {
      return bValue - aValue;
    }
  });

  // Calculate pagination
  const total = filteredPlans.length;
  const totalPages = Math.ceil(total / itemsPerPage);
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedPlans = filteredPlans.slice(startIndex, endIndex);

  return {
    plans: paginatedPlans,
    total,
    page,
    totalPages,
    hasNextPage: page < totalPages,
    hasPrevPage: page > 1,
  };
} 