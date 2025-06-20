'use client';
import { useState, useEffect, useCallback } from 'react';
import {
  Search,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  Info,
  ExternalLink,
  Loader2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
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
  type NBNPlan,
} from '@/types/nbn';
import { APP_SETTINGS } from '@/lib/settings';
import {
  fetchNBNPlans,
  type PlansResponse,
  type PlansFilters,
  type PlansSort,
} from '@/lib/nbnService';
import './css/index.css';
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'

export default function App() {
  return (
    <div className="bg-gray-50 text-gray-900 p-4">
      <AppView />
    </div>
  );
}

function AppView() {
  // State for plans data
  const [plansData, setPlansData] = useState<PlansResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentSort, setCurrentSort] = useState<PlansSort>({ field: 'price', direction: 'asc' });
  const [currentFilters, setCurrentFilters] = useState<PlansFilters>({});

  // Load plans data
  useEffect(() => {
    const loadPlans = async () => {
      setLoading(true);
      try {
        const data = await fetchNBNPlans(
          currentPage,
          APP_SETTINGS.ITEMS_PER_PAGE,
          currentFilters,
          currentSort
        );
        setPlansData(data);
      } catch (error) {
        console.error('Error loading plans:', error);
      } finally {
        setLoading(false);
      }
    };

    loadPlans();
  }, [currentPage, currentSort, currentFilters]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleSortChange = (field: PlansSort['field'], direction: PlansSort['direction']) => {
    setCurrentSort({ field, direction });
    setCurrentPage(1); // Reset to first page when sorting
  };

  const handleFiltersChange = useCallback((newFilters: PlansFilters) => {
    setCurrentFilters(newFilters);
    setCurrentPage(1); // Reset to first page when filtering
  }, []);

  return (
    <div className="space-y-6 max-w-screen-xl mx-auto">
      {/* Enhanced Hero Section for Desktop */}
      <Card className="overflow-hidden border-0 shadow-lg">
        <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-0">
          <div className="grid grid-cols-1 p-4 sm:p-6">
            <h1 className="text-4xl font-bold mb-3 text-white">Compare NBN</h1>
            <p className="text-xl text-white/80 mb-6">Some catchy description or whatever</p>

            <div className="flex flex-wrap gap-6 text-white">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="desktop-glance"
                  checked
                  className="border-white data-[state=checked]:bg-white data-[state=checked]:text-blue-600"
                />
                <Label htmlFor="desktop-glance" className="text-white">
                  at a glance
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="desktop-people"
                  checked
                  className="border-white data-[state=checked]:bg-white data-[state=checked]:text-blue-600"
                />
                <Label htmlFor="desktop-people" className="text-white">
                  see why people
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="desktop-use"
                  checked
                  className="border-white data-[state=checked]:bg-white data-[state=checked]:text-blue-600"
                />
                <Label htmlFor="desktop-use" className="text-white">
                  should use us
                </Label>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Plans Count and Address Search */}
      <Card className="bg-white border border-gray-200 shadow-sm">
        <CardContent className="">
          <div className="flex flex-col sm:flex-row justify-between md:items-center gap-4">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900">
                {loading ? 'Loading...' : `${plansData?.total || 0} NBN plans`}
              </h2>
              <p className="text-gray-500">Updated 12 June 2023</p>
            </div>
            <div className="flex items-center">
              <Input
                placeholder="Enter your address..."
                className="rounded-r-none border-gray-300 bg-white xs:min-w-[240px] md:min-w-[360px]"
              />
              <Button className="rounded-l-none bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 order-2 lg:order-1">
          <Card className="bg-white border border-gray-200 shadow-sm">
            <CardContent className="">
              <div className="flex flex-wrap gap-2 mb-4 items-center p-3 bg-white rounded-md border border-gray-200 shadow-sm">
                <span className="text-sm text-gray-600">Sort:</span>
                <Button
                  variant="outline"
                  size="sm"
                  className={`border-gray-300 ${
                    currentSort.field === 'price' && currentSort.direction === 'asc'
                      ? 'bg-blue-50 border-blue-300'
                      : ''
                  }`}
                  onClick={() => handleSortChange('price', 'asc')}
                >
                  Price
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className={`border-gray-300 ${
                    currentSort.field === 'downloadSpeed' && currentSort.direction === 'asc'
                      ? 'bg-blue-50 border-blue-300'
                      : ''
                  }`}
                  onClick={() => handleSortChange('downloadSpeed', 'asc')}
                >
                  Speed ↑
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className={`border-gray-300 ${
                    currentSort.field === 'downloadSpeed' && currentSort.direction === 'desc'
                      ? 'bg-blue-50 border-blue-300'
                      : ''
                  }`}
                  onClick={() => handleSortChange('downloadSpeed', 'desc')}
                >
                  Speed ↓
                </Button>
              </div>

              <div className="space-y-4">
                {loading ? (
                  <div className="flex items-center justify-center py-12">
                    <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
                    <span className="ml-2 text-gray-600">Loading plans...</span>
                  </div>
                ) : plansData?.plans && plansData.plans.length > 0 ? (
                  <>
                    {plansData.plans.map((plan) => (
                      <DetailedPlanCard
                        key={plan.id}
                        provider={plan.provider}
                        planName={plan.planName}
                        speed={`${plan.downloadSpeed}/${plan.uploadSpeed}`}
                        price={plan.price.toString()}
                        hasPromotion={!!plan.promotion}
                        promotionText={plan.promotion || ''}
                        type={plan.type}
                      />
                    ))}

                    {/* Pagination */}
                    <div className="flex justify-between items-center py-3 px-4 bg-white rounded-md border border-gray-200 shadow-sm">
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          disabled={!plansData.hasPrevPage}
                          onClick={() => handlePageChange(currentPage - 1)}
                        >
                          <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <span className="text-sm">
                          Page {plansData.page} of {plansData.totalPages}
                        </span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          disabled={!plansData.hasNextPage}
                          onClick={() => handlePageChange(currentPage + 1)}
                        >
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                      <span className="text-sm text-gray-500">{plansData.total} plans</span>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-gray-500">No plans found matching your criteria.</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-4 order-1 lg:order-2">
          <FiltersPanel onFiltersChange={handleFiltersChange} />
        </div>
      </div>

      <Card className="bg-white border border-gray-200 shadow-sm">
        <CardContent className="py-4">
          <div className="flex justify-center items-center space-x-4 text-sm text-gray-500">
            <span>© 2025 NBN Compare</span>
            <span>|</span>
            <span>Terms</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function DetailedPlanCard({
  provider = 'MyRepublic',
  planName = 'Premium Plan',
  speed = '100/40',
  price = '89',
  hasPromotion = false,
  promotionText = '',
  type = 'FTTP',
}) {
  const providerInitial = provider.charAt(0);

  return (
    <Card className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
      <CardContent className="">
        {/* Top row: Logo, Plan name, Price CTA */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-md bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center font-bold text-white">
              {providerInitial}
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">{planName}</h3>
            </div>
          </div>
          <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white flex items-center gap-2">
            ${price}/mo
            <ExternalLink className="h-4 w-4" />
          </Button>
        </div>

        {/* Middle row: Promotion Info Box (spans only logo + plan name width) */}
        {hasPromotion && (
          <div className="mb-3">
            <div className="inline-block p-2 bg-blue-50 border border-blue-200 rounded-md max-w-md">
              <div className="flex items-start gap-2">
                <Info className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                <p className="text-xs text-blue-800">{promotionText}</p>
              </div>
            </div>
          </div>
        )}

        {/* Bottom row: Speed and type badges */}
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline" className="text-xs border-gray-300 text-gray-700">
            {speed} Mbps
          </Badge>
          <Badge variant="outline" className="text-xs border-gray-300 text-gray-700">
            {type}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}

function FiltersPanel({
  onFiltersChange,
}: {
  onFiltersChange: (newFilters: PlansFilters) => void;
}) {
  // Create providers list with defaults first, then the rest
  const allProvidersList = [
    ...DEFAULT_PROVIDERS.map((provider) => ({
      id: provider.toLowerCase().replace(/\s+/g, '-'),
      name: provider,
      checked: false,
      isDefault: true,
    })),
    ...ALL_PROVIDERS.filter((provider) => !DEFAULT_PROVIDERS.includes(provider)).map(
      (provider) => ({
        id: provider.toLowerCase().replace(/\s+/g, '-'),
        name: provider,
        checked: false,
        isDefault: false,
      })
    ),
  ];

  const [providers, setProviders] = useState(allProvidersList);
  const [providerSearch, setProviderSearch] = useState('');
  const [hasPromotion, setHasPromotion] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);

  // Radio button states
  const [selectedPriceRange, setSelectedPriceRange] = useState<PriceRange | ''>('');
  const [selectedDownloadSpeed, setSelectedDownloadSpeed] = useState<DownloadSpeed | ''>('');
  const [selectedUploadSpeed, setSelectedUploadSpeed] = useState<UploadSpeed | ''>('');
  const [selectedNBNType, setSelectedNBNType] = useState<NBNType | ''>('');

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
