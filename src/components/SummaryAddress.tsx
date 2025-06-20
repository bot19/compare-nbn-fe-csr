import { useState } from 'react';
import { Search, X, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { lookupAddress, type AddressData } from '@/lib/addressService';
import type { NBNType } from '@/types/nbn';

interface SummaryAddressProps {
  setAddrNbnType: (nbnType: string) => void;
  totalPlans: number;
  dataDate: string;
}

export function SummaryAddress({ setAddrNbnType, totalPlans, dataDate }: SummaryAddressProps) {
  // (2) state: addr input
  const [addrInput, setAddrInput] = useState('');

  // (4) state: NBN API data (this is basically always true in mock flow)
  const [addressFound, setAddressFound] = useState(false);
  const [currentAddress, setCurrentAddress] = useState('');
  const [currentNbnType, setCurrentNbnType] = useState<NBNType | ''>('');
  const [loading, setLoading] = useState(false);

  // (3) action: NBN API fetch (we mocked)
  const handleSearch = async () => {
    if (!addrInput.trim()) return;

    setLoading(true);
    try {
      // send addr input
      const data = await lookupAddress(addrInput.trim());

      // return = addr data + NBN types avail. (for now we just randomly set the nbn type and handle a fake "address found" as per mock flow)
      const selectedNbnType = data.nbnTypes[Math.floor(Math.random() * data.nbnTypes.length)];

      // (4) state: NBN API data - to set = TICK address = found + set
      setAddressFound(true);
      setCurrentAddress(data.address);
      setCurrentNbnType(selectedNbnType);

      // (5) action: set addrNbnType
      setAddrNbnType(selectedNbnType);
    } catch (error) {
      console.error('Error looking up address:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setAddrInput('');
    setAddressFound(false);
    setCurrentAddress('');
    setCurrentNbnType('');
    setAddrNbnType(''); // Clear the NBN type in parent
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-AU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  return (
    <Card className="bg-white border border-gray-200 shadow-sm">
      <CardContent className="">
        <div className="flex flex-col sm:flex-row justify-between md:items-center gap-4">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900">{totalPlans} NBN plans</h2>
            <p className="text-gray-500">Updated {formatDate(dataDate)}</p>
          </div>

          <div className="flex items-center gap-2">
            {addressFound && currentAddress && currentNbnType ? (
              <div className="flex items-center gap-2">
                <Badge
                  variant="outline"
                  className="text-xs border-green-300 text-green-700 bg-green-50"
                >
                  ✓ {currentAddress}
                </Badge>
                <Badge variant="outline" className="text-xs border-blue-300 text-blue-700">
                  {currentNbnType}
                </Badge>
                <Button variant="ghost" size="sm" onClick={handleClear} className="h-8 w-8 p-0">
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <div className="flex items-center">
                <Input
                  placeholder="Enter your address..."
                  value={addrInput}
                  onChange={(e) => setAddrInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="rounded-r-none border-gray-300 bg-white xs:min-w-[240px] md:min-w-[360px]"
                  disabled={loading}
                />
                <Button
                  className="rounded-l-none bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                  onClick={handleSearch}
                  disabled={loading || !addrInput.trim()}
                >
                  {loading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Search className="h-4 w-4" />
                  )}
                </Button>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
