import { useState } from 'react';
import { Search, X, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { lookupAddress, type AddressData } from '@/lib/addressService';
import type { NBNType } from '@/types/nbn';

interface SummaryAddressProps {
  address?: string;
  addrNbnType?: string;
  onAddressChange: (address: string, nbnType: string) => void;
  onAddressClear: () => void;
}

export function SummaryAddress({
  address,
  addrNbnType,
  onAddressChange,
  onAddressClear,
}: SummaryAddressProps) {
  const [inputValue, setInputValue] = useState(address || '');
  const [loading, setLoading] = useState(false);
  const [addressData, setAddressData] = useState<AddressData | null>(null);

  const handleSearch = async () => {
    if (!inputValue.trim()) return;

    setLoading(true);
    try {
      const data = await lookupAddress(inputValue.trim());
      setAddressData(data);

      // Randomly select one NBN type from the available ones
      const selectedNbnType = data.nbnTypes[Math.floor(Math.random() * data.nbnTypes.length)];

      onAddressChange(data.address, selectedNbnType);
    } catch (error) {
      console.error('Error looking up address:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setInputValue('');
    setAddressData(null);
    onAddressClear();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <Card className="bg-white border border-gray-200 shadow-sm">
      <CardContent className="">
        <div className="flex flex-col sm:flex-row justify-between md:items-center gap-4">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900">NBN plans</h2>
            <p className="text-gray-500">Updated 12 June 2023</p>
          </div>

          <div className="flex items-center gap-2">
            {address && addrNbnType ? (
              <div className="flex items-center gap-2">
                <Badge
                  variant="outline"
                  className="text-xs border-green-300 text-green-700 bg-green-50"
                >
                  ✓ {address}
                </Badge>
                <Badge variant="outline" className="text-xs border-blue-300 text-blue-700">
                  {addrNbnType}
                </Badge>
                <Button variant="ghost" size="sm" onClick={handleClear} className="h-8 w-8 p-0">
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <div className="flex items-center">
                <Input
                  placeholder="Enter your address..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="rounded-r-none border-gray-300 bg-white xs:min-w-[240px] md:min-w-[360px]"
                  disabled={loading}
                />
                <Button
                  className="rounded-l-none bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                  onClick={handleSearch}
                  disabled={loading || !inputValue.trim()}
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
