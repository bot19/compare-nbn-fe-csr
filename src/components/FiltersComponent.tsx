import { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Switch } from '@/components/ui/switch';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio';
import {
  DEFAULT_PROVIDERS,
  ALL_PROVIDERS,
  DEFAULT_DOWNLOAD_SPEEDS,
  DEFAULT_UPLOAD_SPEEDS,
  DEFAULT_NBN_TYPES,
  DEFAULT_PRICE_RANGES,
  type Provider,
  type DownloadSpeed,
  type UploadSpeed,
  type NBNType,
  type PriceRange,
} from '@/types/nbn';
import type { PlansFilters } from '@/lib/nbnService';

interface FiltersComponentProps {
  filters: PlansFilters;
  onFiltersChange: (filters: PlansFilters) => void;
}

export function FiltersComponent({ filters, onFiltersChange }: FiltersComponentProps) {
  // Create providers list with defaults first, then the rest
  const allProvidersList = [
    ...DEFAULT_PROVIDERS.map((provider) => ({
      id: provider.toLowerCase().replace(/\s+/g, '-'),
      name: provider,
      checked: filters.providers?.includes(provider) || false,
      isDefault: true,
    })),
    ...ALL_PROVIDERS.filter((provider) => !DEFAULT_PROVIDERS.includes(provider)).map(
      (provider) => ({
        id: provider.toLowerCase().replace(/\s+/g, '-'),
        name: provider,
        checked: filters.providers?.includes(provider) || false,
        isDefault: false,
      })
    ),
  ];

  const [providers, setProviders] = useState(allProvidersList);
  const [providerSearch, setProviderSearch] = useState('');
  const [isExpanded, setIsExpanded] = useState(true);

  // Radio button states - sync with props
  const [selectedPriceRange, setSelectedPriceRange] = useState<PriceRange | ''>(
    filters.priceRange || ''
  );
  const [selectedDownloadSpeed, setSelectedDownloadSpeed] = useState<DownloadSpeed | ''>(
    filters.downloadSpeed || ''
  );
  const [selectedUploadSpeed, setSelectedUploadSpeed] = useState<UploadSpeed | ''>(
    filters.uploadSpeed || ''
  );
  const [selectedNBNType, setSelectedNBNType] = useState<NBNType | ''>(filters.nbnType || '');
  const [hasPromotion, setHasPromotion] = useState(filters.hasPromotion || false);

  // Update local state when props change
  useEffect(() => {
    setSelectedPriceRange(
      DEFAULT_PRICE_RANGES.includes(filters.priceRange as PriceRange)
        ? (filters.priceRange as PriceRange)
        : ''
    );
    setSelectedDownloadSpeed(
      DEFAULT_DOWNLOAD_SPEEDS.includes(filters.downloadSpeed as DownloadSpeed)
        ? (filters.downloadSpeed as DownloadSpeed)
        : ''
    );
    setSelectedUploadSpeed(
      DEFAULT_UPLOAD_SPEEDS.includes(filters.uploadSpeed as UploadSpeed)
        ? (filters.uploadSpeed as UploadSpeed)
        : ''
    );
    setSelectedNBNType(
      DEFAULT_NBN_TYPES.includes(filters.nbnType as NBNType) ? (filters.nbnType as NBNType) : ''
    );
    setHasPromotion(filters.hasPromotion || false);

    setProviders(
      providers.map((p) => ({
        ...p,
        checked: filters.providers?.includes(p.name) || false,
      }))
    );
  }, [filters]);

  const filteredProviders = providers.filter((provider) =>
    provider.name.toLowerCase().includes(providerSearch.toLowerCase())
  );

  // Separate default and other providers for display
  const defaultProviders = filteredProviders.filter((provider) => provider.isDefault);
  const otherProviders = filteredProviders.filter((provider) => !provider.isDefault);

  const handleClearAll = () => {
    setProviders(providers.map((p) => ({ ...p, checked: false })));
    setHasPromotion(false);
    setSelectedPriceRange('');
    setSelectedDownloadSpeed('');
    setSelectedUploadSpeed('');
    setSelectedNBNType('');

    onFiltersChange({});
  };

  const handleApplyFilters = () => {
    const selectedProviders = providers
      .filter((provider) => provider.checked)
      .map((provider) => provider.name);

    const newFilters: PlansFilters = {
      providers: selectedProviders.length > 0 ? selectedProviders : undefined,
      priceRange: selectedPriceRange || undefined,
      downloadSpeed: selectedDownloadSpeed || undefined,
      uploadSpeed: selectedUploadSpeed || undefined,
      nbnType: selectedNBNType || undefined,
      hasPromotion: hasPromotion || undefined,
    };

    onFiltersChange(newFilters);
  };

  return (
    <Card className="bg-white border border-gray-200 shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <CardTitle className="text-lg text-gray-900">Filters</CardTitle>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsExpanded(!isExpanded)}
          className="border-gray-300"
        >
          {isExpanded ? 'Close' : 'Open'}
        </Button>
      </CardHeader>

      {isExpanded && (
        <>
          <CardContent className="space-y-4 py-0 sm:py-0">
            {/* Has Promotion Toggle - Moved to top */}
            <div className="flex items-center justify-between p-3 bg-white rounded-md border border-gray-200 shadow-sm">
              <span className="text-gray-900">Has promotion</span>
              <Switch checked={hasPromotion} onCheckedChange={setHasPromotion} />
            </div>

            {/* Price Range Filter - Changed to radio */}
            <Collapsible className="w-full">
              <CollapsibleTrigger className="flex items-center justify-between w-full p-3 bg-white rounded-md hover:bg-gray-50 transition-colors border border-gray-200 shadow-sm">
                <span className="text-gray-900">Price range</span>
                <ChevronDown className="h-4 w-4 text-gray-500" />
              </CollapsibleTrigger>
              <CollapsibleContent className="mt-2 p-3 bg-white rounded-md border border-gray-200 shadow-sm">
                <RadioGroup
                  value={selectedPriceRange}
                  onValueChange={(value) => setSelectedPriceRange(value as PriceRange)}
                >
                  <div className="space-y-2">
                    {DEFAULT_PRICE_RANGES.map((priceRange) => (
                      <div key={priceRange} className="flex items-center space-x-2">
                        <RadioGroupItem
                          value={priceRange}
                          id={`price-${priceRange}`}
                          className="border-gray-300"
                        />
                        <Label htmlFor={`price-${priceRange}`} className="text-gray-700">
                          {priceRange}
                        </Label>
                      </div>
                    ))}
                  </div>
                </RadioGroup>
              </CollapsibleContent>
            </Collapsible>

            {/* Speed Down Filter - Changed to radio */}
            <Collapsible className="w-full">
              <CollapsibleTrigger className="flex items-center justify-between w-full p-3 bg-white rounded-md hover:bg-gray-50 transition-colors border border-gray-200 shadow-sm">
                <span className="text-gray-900">Speed - down</span>
                <ChevronDown className="h-4 w-4 text-gray-500" />
              </CollapsibleTrigger>
              <CollapsibleContent className="mt-2 p-3 bg-white rounded-md border border-gray-200 shadow-sm">
                <RadioGroup
                  value={selectedDownloadSpeed}
                  onValueChange={(value) => setSelectedDownloadSpeed(value as DownloadSpeed)}
                >
                  <div className="space-y-2">
                    {DEFAULT_DOWNLOAD_SPEEDS.map((speed) => (
                      <div key={speed} className="flex items-center space-x-2">
                        <RadioGroupItem
                          value={speed}
                          id={`speed-${speed}`}
                          className="border-gray-300"
                        />
                        <Label htmlFor={`speed-${speed}`} className="text-gray-700">
                          {speed} Mbps
                        </Label>
                      </div>
                    ))}
                  </div>
                </RadioGroup>
              </CollapsibleContent>
            </Collapsible>

            {/* Speed Up Filter - Changed to radio */}
            <Collapsible className="w-full">
              <CollapsibleTrigger className="flex items-center justify-between w-full p-3 bg-white rounded-md hover:bg-gray-50 transition-colors border border-gray-200 shadow-sm">
                <span className="text-gray-900">Speed - up</span>
                <ChevronDown className="h-4 w-4 text-gray-500" />
              </CollapsibleTrigger>
              <CollapsibleContent className="mt-2 p-3 bg-white rounded-md border border-gray-200 shadow-sm">
                <RadioGroup
                  value={selectedUploadSpeed}
                  onValueChange={(value) => setSelectedUploadSpeed(value as UploadSpeed)}
                >
                  <div className="space-y-2">
                    {DEFAULT_UPLOAD_SPEEDS.map((speed) => (
                      <div key={speed} className="flex items-center space-x-2">
                        <RadioGroupItem
                          value={speed}
                          id={`up-${speed}`}
                          className="border-gray-300"
                        />
                        <Label htmlFor={`up-${speed}`} className="text-gray-700">
                          {speed} Mbps
                        </Label>
                      </div>
                    ))}
                  </div>
                </RadioGroup>
              </CollapsibleContent>
            </Collapsible>

            {/* Fibre Type Filter - Changed to radio */}
            <Collapsible className="w-full">
              <CollapsibleTrigger className="flex items-center justify-between w-full p-3 bg-white rounded-md hover:bg-gray-50 transition-colors border border-gray-200 shadow-sm">
                <span className="text-gray-900">Fibre type</span>
                <ChevronDown className="h-4 w-4 text-gray-500" />
              </CollapsibleTrigger>
              <CollapsibleContent className="mt-2 p-3 bg-white rounded-md border border-gray-200 shadow-sm">
                <RadioGroup
                  value={selectedNBNType}
                  onValueChange={(value) => setSelectedNBNType(value as NBNType)}
                >
                  <div className="space-y-2">
                    {DEFAULT_NBN_TYPES.map((type) => (
                      <div key={type} className="flex items-center space-x-2">
                        <RadioGroupItem
                          value={type}
                          id={`type-${type}`}
                          className="border-gray-300"
                        />
                        <Label htmlFor={`type-${type}`} className="text-gray-700">
                          {type}
                        </Label>
                      </div>
                    ))}
                  </div>
                </RadioGroup>
              </CollapsibleContent>
            </Collapsible>

            {/* Providers Filter - Keep as checkboxes for multiple selection */}
            <Collapsible className="w-full">
              <CollapsibleTrigger className="flex items-center justify-between w-full p-3 bg-white rounded-md hover:bg-gray-50 transition-colors border border-gray-200 shadow-sm">
                <span className="text-gray-900">Providers</span>
                <ChevronDown className="h-4 w-4 text-gray-500" />
              </CollapsibleTrigger>
              <CollapsibleContent className="mt-2 p-3 bg-white rounded-md border border-gray-200 shadow-sm">
                <div className="space-y-3">
                  <Input
                    placeholder="Search providers..."
                    value={providerSearch}
                    onChange={(e) => setProviderSearch(e.target.value)}
                    className="mb-2 border-gray-300"
                  />

                  <div className="space-y-2 h-64 overflow-y-auto pr-1">
                    {filteredProviders.length > 0 ? (
                      <div className="space-y-3">
                        {/* Default/Popular Providers */}
                        {defaultProviders.length > 0 && (
                          <div>
                            <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
                              Popular Providers
                            </div>
                            <div className="space-y-2">
                              {defaultProviders.map((provider) => (
                                <div key={provider.id} className="flex items-center space-x-2">
                                  <Checkbox
                                    id={provider.id}
                                    checked={provider.checked}
                                    className="border-gray-300"
                                    onCheckedChange={(checked) => {
                                      setProviders(
                                        providers.map((p) =>
                                          p.id === provider.id ? { ...p, checked: !!checked } : p
                                        )
                                      );
                                    }}
                                  />
                                  <Label htmlFor={provider.id} className="text-gray-700">
                                    {provider.name}
                                  </Label>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Visual Separator */}
                        {defaultProviders.length > 0 && otherProviders.length > 0 && (
                          <div className="border-t border-gray-200 my-3"></div>
                        )}

                        {/* Other Providers */}
                        {otherProviders.length > 0 && (
                          <div>
                            <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
                              All Providers
                            </div>
                            <div className="space-y-2">
                              {otherProviders.map((provider) => (
                                <div key={provider.id} className="flex items-center space-x-2">
                                  <Checkbox
                                    id={provider.id}
                                    checked={provider.checked}
                                    className="border-gray-300"
                                    onCheckedChange={(checked) => {
                                      setProviders(
                                        providers.map((p) =>
                                          p.id === provider.id ? { ...p, checked: !!checked } : p
                                        )
                                      );
                                    }}
                                  />
                                  <Label htmlFor={provider.id} className="text-gray-700">
                                    {provider.name}
                                  </Label>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ) : (
                      <p className="text-sm text-gray-500">No providers found</p>
                    )}
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>
          </CardContent>
          <CardFooter>
            <div className="flex justify-between w-full">
              <Button
                variant="outline"
                size="sm"
                className="border-gray-300"
                onClick={handleClearAll}
              >
                Clear all
              </Button>
              <Button
                size="sm"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                onClick={handleApplyFilters}
              >
                Apply filters
              </Button>
            </div>
          </CardFooter>
        </>
      )}
    </Card>
  );
}
