import { useState, useEffect, useMemo } from 'react';
import { Loader2 } from 'lucide-react';
import { SummaryAddress } from './SummaryAddress';
import { PlansViewControl } from './PlansViewControl';
import { fetchAllPlans } from '@/lib/dataService';
import type { NBNPlan } from '@/types/nbn';

export function Page() {
  // (1) action: fetch data = dataFetched
  const [dataFetched, setDataFetched] = useState<NBNPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [dataDate, setDataDate] = useState<string>('');

  // (3) state: addrNbnType = list of str
  const [addrNbnType, setAddrNbnType] = useState<string>('');

  // Fetch all data on mount
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const data = await fetchAllPlans();
        setDataFetched(data);
        // (5) Updated dateTime = dataFetched dateTime provided || today (as data daily scraped)
        setDataDate(new Date().toISOString());
      } catch (error) {
        console.error('Error loading plans:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // (2) state: dataFilAddr = optimised([ ... dataFetched ])
  // deps: dataFetched, addrNbnType
  const dataFilAddr = useMemo(() => {
    if (!addrNbnType) return dataFetched;

    return dataFetched.filter((plan) => plan.type === addrNbnType);
  }, [dataFetched, addrNbnType]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
        <span className="ml-2 text-gray-600">Loading plans...</span>
      </div>
    );
  }

  return (
    <div className="space-y-2 sm:space-y-6">
      <SummaryAddress
        setAddrNbnType={setAddrNbnType}
        totalPlans={dataFilAddr.length} // (4) # NBN plans = dataFilAddr.length()
        dataDate={dataDate} // (5) Updated dateTime
      />

      <PlansViewControl dataFilAddr={dataFilAddr} />
    </div>
  );
}
