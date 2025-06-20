import { nbnPlansData } from '@/data/nbnPlans';
import type { NBNPlan } from '@/types/nbn';

// Mock delay for simulating API call
const MOCK_DELAY_MS = 500;

// Fetch all plans data
export async function fetchAllPlans(): Promise<NBNPlan[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, MOCK_DELAY_MS));
  
  return nbnPlansData.plans;
} 