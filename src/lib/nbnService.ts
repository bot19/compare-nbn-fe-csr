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

// Cache key and expiry management
const CACHE_KEY = 'nbn_plans_data';
const CACHE_EXPIRY_HOURS = 24;

interface CacheData {
  data: NBNPlan[];
  timestamp: number;
  dataDate: string;
}

function getCachedData(): NBNPlan[] | null {
  try {
    const cached = localStorage.getItem(CACHE_KEY);
    if (!cached) return null;

    const cacheData: CacheData = JSON.parse(cached);
    const now = Date.now();
    const expiryTime = cacheData.timestamp + (CACHE_EXPIRY_HOURS * 60 * 60 * 1000);

    if (now > expiryTime) {
      localStorage.removeItem(CACHE_KEY);
      return null;
    }

    return cacheData.data;
  } catch (error) {
    console.error('Error reading cache:', error);
    return null;
  }
}

function setCachedData(data: NBNPlan[]): void {
  try {
    const cacheData: CacheData = {
      data,
      timestamp: Date.now(),
      dataDate: new Date().toISOString(),
    };
    localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));
  } catch (error) {
    console.error('Error writing cache:', error);
  }
}

// Fetch all plans data (with caching)
export async function fetchAllNBNPlans(): Promise<NBNPlan[]> {
  // Check cache first
  const cachedData = getCachedData();
  if (cachedData) {
    return cachedData;
  }

  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, APP_SETTINGS.DATA_LOADING_DELAY_MS));

  // Cache the data
  setCachedData(nbnPlansData.plans);
  
  return nbnPlansData.plans;
}

// Client-side filtering and sorting
export function filterAndSortPlans(
  plans: NBNPlan[],
  filters: PlansFilters = {},
  sort: PlansSort = { field: 'price', direction: 'asc' }
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

  return filteredPlans;
}

// Paginate filtered plans
export function paginatePlans(
  plans: NBNPlan[],
  page: number = 1,
  itemsPerPage: number = APP_SETTINGS.ITEMS_PER_PAGE
): PlansResponse {
  const total = plans.length;
  const totalPages = Math.ceil(total / itemsPerPage);
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedPlans = plans.slice(startIndex, endIndex);

  return {
    plans: paginatedPlans,
    total,
    page,
    totalPages,
    hasNextPage: page < totalPages,
    hasPrevPage: page > 1,
  };
}

// Legacy function for backward compatibility (now uses client-side filtering)
export async function fetchNBNPlans(
  page: number = 1,
  itemsPerPage: number = APP_SETTINGS.ITEMS_PER_PAGE,
  filters: PlansFilters = {},
  sort: PlansSort = { field: 'price', direction: 'asc' }
): Promise<PlansResponse> {
  const allPlans = await fetchAllNBNPlans();
  const filteredPlans = filterAndSortPlans(allPlans, filters, sort);
  return paginatePlans(filteredPlans, page, itemsPerPage);
} 