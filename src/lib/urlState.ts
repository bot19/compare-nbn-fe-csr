import type { PlansFilters } from './filterService';
import type { PlansSort } from './sortService';
import { DEFAULT_PRICE_RANGES, DEFAULT_DOWNLOAD_SPEEDS, DEFAULT_UPLOAD_SPEEDS } from '@/types/nbn';

export interface URLState {
  address?: string;
  addrNbnType?: string;
  sort?: PlansSort;
  filters?: PlansFilters;
  currentPage?: number;
}

// Convert state to URL search params
export function stateToURL(state: URLState): URLSearchParams {
  const params = new URLSearchParams();

  if (state.address) params.set('address', state.address);
  if (state.addrNbnType) params.set('addrNbnType', state.addrNbnType);
  if (state.currentPage && state.currentPage > 1) params.set('page', state.currentPage.toString());

  // Sort
  if (state.sort) {
    params.set('sortField', state.sort.field);
    params.set('sortDirection', state.sort.direction);
  }

  // Filters
  if (state.filters) {
    if (state.filters.providers && state.filters.providers.length > 0) {
      params.set('providers', state.filters.providers.join(','));
    }
    if (state.filters.priceRange) params.set('priceRange', state.filters.priceRange.key);
    if (state.filters.downloadSpeed) params.set('downloadSpeed', state.filters.downloadSpeed.key);
    if (state.filters.uploadSpeed) params.set('uploadSpeed', state.filters.uploadSpeed.key);
    if (state.filters.nbnType) params.set('nbnType', state.filters.nbnType);
    if (state.filters.hasPromotion) params.set('hasPromotion', 'true');
  }

  return params;
}

// Convert URL search params to state
export function urlToState(): URLState {
  const params = new URLSearchParams(window.location.search);
  const state: URLState = {};

  // Basic params
  if (params.has('address')) state.address = params.get('address')!;
  if (params.has('addrNbnType')) state.addrNbnType = params.get('addrNbnType')!;
  if (params.has('page')) {
    const page = parseInt(params.get('page')!);
    if (!isNaN(page) && page > 0) state.currentPage = page;
  }

  // Sort
  if (params.has('sortField') && params.has('sortDirection')) {
    state.sort = {
      field: params.get('sortField')! as PlansSort['field'],
      direction: params.get('sortDirection')! as PlansSort['direction'],
    };
  }

  // Filters
  const filters: PlansFilters = {};
  if (params.has('providers')) {
    filters.providers = params.get('providers')!.split(',');
  }
  if (params.has('priceRange')) {
    const priceRangeKey = params.get('priceRange')!;
    filters.priceRange = DEFAULT_PRICE_RANGES.find(pr => pr.key === priceRangeKey);
  }
  if (params.has('downloadSpeed')) {
    const downloadSpeedKey = params.get('downloadSpeed')!;
    filters.downloadSpeed = DEFAULT_DOWNLOAD_SPEEDS.find(ds => ds.key === downloadSpeedKey);
  }
  if (params.has('uploadSpeed')) {
    const uploadSpeedKey = params.get('uploadSpeed')!;
    filters.uploadSpeed = DEFAULT_UPLOAD_SPEEDS.find(us => us.key === uploadSpeedKey);
  }
  if (params.has('nbnType')) filters.nbnType = params.get('nbnType')!;
  if (params.has('hasPromotion')) filters.hasPromotion = true;

  if (Object.keys(filters).length > 0) {
    state.filters = filters;
  }

  return state;
}

// Update URL with new state
export function updateURL(state: URLState): void {
  const params = stateToURL(state);
  const newURL = params.toString() ? `?${params.toString()}` : window.location.pathname;
  
  window.history.replaceState({}, '', newURL);
}

// Get initial state from URL or defaults
export function getInitialState(): URLState {
  const urlState = urlToState();
  
  return {
    currentPage: urlState.currentPage || 1,
    sort: urlState.sort || { field: 'price', direction: 'asc' },
    filters: urlState.filters || {},
    address: urlState.address,
    addrNbnType: urlState.addrNbnType,
  };
} 