import { DEFAULT_NBN_TYPES, type NBNType } from '@/types/nbn';

export interface AddressData {
  address: string;
  nbnTypes: NBNType[];
  found: boolean;
}

export async function lookupAddress(address: string): Promise<AddressData> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));

  // Mock: randomly select 1-3 NBN types for the address
  const numTypes = Math.floor(Math.random() * 3) + 1; // 1-3 types
  const shuffledTypes = [...DEFAULT_NBN_TYPES].sort(() => Math.random() - 0.5);
  const selectedTypes = shuffledTypes.slice(0, numTypes);

  return {
    address,
    nbnTypes: selectedTypes,
    found: true,
  };
} 