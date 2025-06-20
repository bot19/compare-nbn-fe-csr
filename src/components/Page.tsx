import { useState, useEffect, useMemo } from 'react';
import { Loader2 } from 'lucide-react';
import { SummaryAddress } from './SummaryAddress';
import { PlansViewControl } from './PlansViewControl';
import { FiltersComponent } from './FiltersComponent';
import {
  fetchAllNBNPlans,
  filterAndSortPlans,
  type PlansFilters,
  type PlansSort,
} from '@/lib/nbnService';
import { getInitialState, updateURL, type URLState } from '@/lib/urlState';
import type { NBNPlan } from '@/types/nbn';

export function Page() {
  // Layer 0: Fetched data
  const [dataFetched, setDataFetched] = useState<NBNPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [dataDate, setDataDate] = useState<string>('');

  // Layer 1: Address-filtered data
  const [address, setAddress] = useState<string>('');
  const [addrNbnType, setAddrNbnType] = useState<string>('');

  // Layer 2: User filters and sort
  const [sort, setSort] = useState<PlansSort>({ field: 'price', direction: 'asc' });
  const [filters, setFilters] = useState<PlansFilters>({});
  const [currentPage, setCurrentPage] = useState(1);

  // Initialize from URL
  useEffect(() => {
    const initialState = getInitialState();
    setAddress(initialState.address || '');
    setAddrNbnType(initialState.addrNbnType || '');
    setSort(initialState.sort || { field: 'price', direction: 'asc' });
    setFilters(initialState.filters || {});
    setCurrentPage(initialState.currentPage || 1);
  }, []);

  // Fetch all data on mount
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const data = await fetchAllNBNPlans();
        setDataFetched(data);
        setDataDate(new Date().toISOString());
      } catch (error) {
        console.error('Error loading plans:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Layer 1: Address-filtered data (optimized)
  const dataFilAddr = useMemo(() => {
    if (!addrNbnType) return dataFetched;

    return dataFetched.filter((plan) => plan.type === addrNbnType);
  }, [dataFetched, addrNbnType]);

  // Update URL when state changes
  useEffect(() => {
    const urlState: URLState = {
      address,
      addrNbnType,
      sort,
      filters,
      currentPage: currentPage > 1 ? currentPage : undefined,
    };
    updateURL(urlState);
  }, [address, addrNbnType, sort, filters, currentPage]);

  const handleAddressChange = (newAddress: string, newNbnType: string) => {
    setAddress(newAddress);
    setAddrNbnType(newNbnType);
    setCurrentPage(1); // Reset to first page
  };

  const handleAddressClear = () => {
    setAddress('');
    setAddrNbnType('');
    setCurrentPage(1); // Reset to first page
  };

  const handleSortChange = (newSort: PlansSort) => {
    setSort(newSort);
    setCurrentPage(1); // Reset to first page
  };

  const handleFiltersChange = (newFilters: PlansFilters) => {
    setFilters(newFilters);
    setCurrentPage(1); // Reset to first page
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
        <span className="ml-2 text-gray-600">Loading plans...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-screen-xl mx-auto">
      <SummaryAddress
        address={address}
        addrNbnType={addrNbnType}
        onAddressChange={handleAddressChange}
        onAddressClear={handleAddressClear}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 order-2 lg:order-1">
          <PlansViewControl
            dataFilAddr={dataFilAddr}
            sort={sort}
            filters={filters}
            currentPage={currentPage}
            onSortChange={handleSortChange}
            onFiltersChange={handleFiltersChange}
            onPageChange={handlePageChange}
          />
        </div>

        <div className="lg:col-span-4 order-1 lg:order-2">
          <FiltersComponent filters={filters} onFiltersChange={handleFiltersChange} />
        </div>
      </div>
    </div>
  );
}
