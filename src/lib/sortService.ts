import type { NBNPlan } from '@/types/nbn';

export interface PlansSort {
  field: 'price' | 'downloadSpeed' | 'uploadSpeed';
  direction: 'asc' | 'desc';
}

// Client-side sorting
export function sortPlans(
  plans: NBNPlan[],
  sort?: PlansSort
): NBNPlan[] {
  if (!sort) return plans;

  const sortedPlans = [...plans];
  
  sortedPlans.sort((a, b) => {
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

  return sortedPlans;
} 