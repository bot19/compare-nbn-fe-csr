'use client';
import { useState } from 'react';
import { Search, ChevronRight, ChevronLeft, ChevronDown, Info, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Switch } from '@/components/ui/switch';
import './css/index.css';
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'

export default function NBNComparison() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <Tabs defaultValue="desktop" className="w-full">
        <div className="container mx-auto py-6">
          <TabsList className="mb-8 bg-white border border-gray-200">
            <TabsTrigger value="mobile" className="text-lg">
              Mobile
            </TabsTrigger>
            <TabsTrigger value="desktop" className="text-lg">
              Desktop
            </TabsTrigger>
          </TabsList>

          <TabsContent value="mobile">
            <MobileView />
          </TabsContent>

          <TabsContent value="desktop">
            <DesktopView />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}

function MobileView() {
  return (
    <div className="flex flex-col gap-6 max-w-sm mx-auto">
      {/* Enhanced Hero Section for Mobile */}
      <Card className="overflow-hidden border-0 shadow-lg">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
          <h1 className="text-2xl font-bold mb-2 text-center">Compare NBN</h1>
          <p className="text-center opacity-90 mb-6">Some catchy description or whatever</p>

          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="mobile-glance"
                checked
                className="border-white data-[state=checked]:bg-white data-[state=checked]:text-blue-600"
              />
              <Label htmlFor="mobile-glance" className="text-white">
                at a glance
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="mobile-people"
                checked
                className="border-white data-[state=checked]:bg-white data-[state=checked]:text-blue-600"
              />
              <Label htmlFor="mobile-people" className="text-white">
                see why people
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="mobile-use"
                checked
                className="border-white data-[state=checked]:bg-white data-[state=checked]:text-blue-600"
              />
              <Label htmlFor="mobile-use" className="text-white">
                should use us
              </Label>
            </div>
          </div>
        </div>
      </Card>

      {/* Plans Count and Address Search */}
      <Card className="bg-white border border-gray-200 shadow-sm">
        <CardContent className="p-4">
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">300 NBN plans</h2>
                <p className="text-sm text-gray-500">Updated 12 June 2023</p>
              </div>
            </div>
            <div className="flex">
              <Input
                placeholder="Enter your address..."
                className="rounded-r-none border-gray-300 bg-white"
              />
              <Button className="rounded-l-none bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white border border-gray-200 shadow-sm">
        <CardContent className="space-y-4 p-4">
          <div className="flex flex-wrap gap-2 mb-6 items-center p-3 bg-white rounded-md border border-gray-200 shadow-sm">
            <span className="text-sm text-gray-600">Sort:</span>
            <Button variant="outline" size="sm" className="border-gray-300">
              Price
            </Button>
            <Button variant="outline" size="sm" className="border-gray-300">
              Speed ↑
            </Button>
            <Button variant="outline" size="sm" className="border-gray-300">
              Speed ↓
            </Button>
          </div>

          <div className="space-y-3">
            <DetailedPlanCard hasPromotion={true} promotionText="$10 off for 6 months" />
            <DetailedPlanCard
              provider="Aussie Broadband"
              planName="Family Plan"
              hasPromotion={true}
              promotionText="Free modem + setup and $10 monthly discount for the first 6 months when you sign up online"
            />
            <DetailedPlanCard provider="TPG" planName="Basic Plan" speed="25/5" price="59" />

            <div className="flex justify-center space-x-1 py-2">
              <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
              <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
              <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
            </div>

            <div className="flex justify-between items-center py-3 px-4 bg-white rounded-md border border-gray-200 shadow-sm">
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="icon" className="h-6 w-6">
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <span className="text-sm">Page 1 of 10</span>
                <Button variant="ghost" size="icon" className="h-6 w-6">
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
              <span className="text-sm text-gray-500">300 plans</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Mobile Filters */}
      <Card className="bg-white border border-gray-200 shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg">Filters</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <MobileFiltersPanel />
        </CardContent>
      </Card>

      <Card className="bg-white border border-gray-200 shadow-sm">
        <CardContent className="py-4">
          <div className="flex justify-center items-center space-x-4 text-sm text-gray-500">
            <span>© 2023 NBN Compare</span>
            <span>|</span>
            <span>Terms</span>
            <span>|</span>
            <span>Privacy</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function DesktopView() {
  return (
    <div className="space-y-6">
      {/* Enhanced Hero Section for Desktop */}
      <Card className="overflow-hidden border-0 shadow-lg">
        <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-0">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            <div className="md:col-span-8 p-8">
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

            <div className="md:col-span-4 p-6 flex items-center justify-center">
              <div className="w-full h-32 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center">
                <span className="text-white/60 text-sm">Graphics placeholder</span>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Plans Count and Address Search */}
      <Card className="bg-white border border-gray-200 shadow-sm">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900">300 NBN plans</h2>
              <p className="text-gray-500">Updated 12 June 2023</p>
            </div>
            <div className="flex">
              <Input
                placeholder="Enter your address..."
                className="rounded-r-none border-gray-300 bg-white min-w-[300px]"
              />
              <Button className="rounded-l-none bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main content */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <div className="md:col-span-8">
          <Card className="bg-white border border-gray-200 shadow-sm">
            <CardContent className="p-6">
              <div className="flex flex-wrap gap-2 mb-6 items-center p-3 bg-white rounded-md border border-gray-200 shadow-sm">
                <span className="text-sm text-gray-600">Sort:</span>
                <Button variant="outline" size="sm" className="border-gray-300">
                  Price
                </Button>
                <Button variant="outline" size="sm" className="border-gray-300">
                  Speed ↑
                </Button>
                <Button variant="outline" size="sm" className="border-gray-300">
                  Speed ↓
                </Button>
              </div>

              <div className="space-y-4">
                <DetailedPlanCard hasPromotion={true} promotionText="$10 off for 6 months" />
                <DetailedPlanCard
                  provider="Aussie Broadband"
                  planName="Family Plan"
                  hasPromotion={true}
                  promotionText="Free modem + setup and $10 monthly discount for the first 6 months when you sign up online"
                />
                <DetailedPlanCard provider="TPG" planName="Basic Plan" speed="25/5" price="59" />

                <div className="flex justify-center space-x-1 py-4">
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
                </div>

                <div className="flex justify-between items-center py-3 px-4 bg-white rounded-md border border-gray-200 shadow-sm">
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <span className="text-sm">Page 1 of 10</span>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                  <span className="text-sm text-gray-500">300 plans</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-4">
          <FiltersPanel />
        </div>
      </div>

      <Card className="bg-white border border-gray-200 shadow-sm">
        <CardContent className="py-4">
          <div className="flex justify-center items-center space-x-4 text-sm text-gray-500">
            <span>© 2023 NBN Compare</span>
            <span>|</span>
            <span>Terms</span>
            <span>|</span>
            <span>Privacy</span>
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
      <CardContent className="p-4">
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

function FiltersPanel() {
  const [providers, setProviders] = useState([
    { id: 'telstra', name: 'Telstra', checked: false },
    { id: 'optus', name: 'Optus', checked: false },
    { id: 'tpg', name: 'TPG', checked: false },
    { id: 'aussie', name: 'Aussie Broadband', checked: false },
    { id: 'myrepublic', name: 'MyRepublic', checked: false },
    { id: 'superloop', name: 'Superloop', checked: false },
    { id: 'exetel', name: 'Exetel', checked: false },
    { id: 'dodo', name: 'Dodo', checked: false },
  ]);
  const [providerSearch, setProviderSearch] = useState('');
  const [hasPromotion, setHasPromotion] = useState(false);

  const filteredProviders = providers.filter((provider) =>
    provider.name.toLowerCase().includes(providerSearch.toLowerCase())
  );

  return (
    <Card className="bg-white border border-gray-200 shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg text-gray-900">Filters</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Price Range Filter */}
        <Collapsible className="w-full">
          <CollapsibleTrigger className="flex items-center justify-between w-full p-3 bg-white rounded-md hover:bg-gray-50 transition-colors border border-gray-200 shadow-sm">
            <span className="text-gray-900">Price range</span>
            <ChevronDown className="h-4 w-4 text-gray-500" />
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-2 p-3 bg-white rounded-md border border-gray-200 shadow-sm">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="price-50-75" className="border-gray-300" />
                <Label htmlFor="price-50-75" className="text-gray-700">
                  $50 - $75
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="price-75-100" className="border-gray-300" />
                <Label htmlFor="price-75-100" className="text-gray-700">
                  $75 - $100
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="price-100-125" className="border-gray-300" />
                <Label htmlFor="price-100-125" className="text-gray-700">
                  $100 - $125
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="price-125-150" className="border-gray-300" />
                <Label htmlFor="price-125-150" className="text-gray-700">
                  $125 - $150
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="price-150+" className="border-gray-300" />
                <Label htmlFor="price-150+" className="text-gray-700">
                  $150+
                </Label>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>

        {/* Has Promotion Toggle */}
        <div className="flex items-center justify-between p-3 bg-white rounded-md border border-gray-200 shadow-sm">
          <span className="text-gray-900">Has promotion</span>
          <Switch checked={hasPromotion} onCheckedChange={setHasPromotion} />
        </div>

        {/* Speed Down Filter */}
        <Collapsible className="w-full">
          <CollapsibleTrigger className="flex items-center justify-between w-full p-3 bg-white rounded-md hover:bg-gray-50 transition-colors border border-gray-200 shadow-sm">
            <span className="text-gray-900">Speed - down</span>
            <ChevronDown className="h-4 w-4 text-gray-500" />
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-2 p-3 bg-white rounded-md border border-gray-200 shadow-sm">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="speed-25" className="border-gray-300" />
                <Label htmlFor="speed-25" className="text-gray-700">
                  25 Mbps
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="speed-50" className="border-gray-300" />
                <Label htmlFor="speed-50" className="text-gray-700">
                  50 Mbps
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="speed-100" className="border-gray-300" />
                <Label htmlFor="speed-100" className="text-gray-700">
                  100 Mbps
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="speed-250" className="border-gray-300" />
                <Label htmlFor="speed-250" className="text-gray-700">
                  250 Mbps
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="speed-1000" className="border-gray-300" />
                <Label htmlFor="speed-1000" className="text-gray-700">
                  1000 Mbps
                </Label>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>

        {/* Speed Up Filter */}
        <Collapsible className="w-full">
          <CollapsibleTrigger className="flex items-center justify-between w-full p-3 bg-white rounded-md hover:bg-gray-50 transition-colors border border-gray-200 shadow-sm">
            <span className="text-gray-900">Speed - up</span>
            <ChevronDown className="h-4 w-4 text-gray-500" />
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-2 p-3 bg-white rounded-md border border-gray-200 shadow-sm">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="up-5" className="border-gray-300" />
                <Label htmlFor="up-5" className="text-gray-700">
                  5 Mbps
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="up-20" className="border-gray-300" />
                <Label htmlFor="up-20" className="text-gray-700">
                  20 Mbps
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="up-40" className="border-gray-300" />
                <Label htmlFor="up-40" className="text-gray-700">
                  40 Mbps
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="up-100" className="border-gray-300" />
                <Label htmlFor="up-100" className="text-gray-700">
                  100 Mbps
                </Label>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>

        {/* Fibre Type Filter */}
        <Collapsible className="w-full">
          <CollapsibleTrigger className="flex items-center justify-between w-full p-3 bg-white rounded-md hover:bg-gray-50 transition-colors border border-gray-200 shadow-sm">
            <span className="text-gray-900">Fibre type</span>
            <ChevronDown className="h-4 w-4 text-gray-500" />
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-2 p-3 bg-white rounded-md border border-gray-200 shadow-sm">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="fttp" className="border-gray-300" />
                <Label htmlFor="fttp" className="text-gray-700">
                  FTTP
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="fttn" className="border-gray-300" />
                <Label htmlFor="fttn" className="text-gray-700">
                  FTTN
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="fttc" className="border-gray-300" />
                <Label htmlFor="fttc" className="text-gray-700">
                  FTTC
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="hfc" className="border-gray-300" />
                <Label htmlFor="hfc" className="text-gray-700">
                  HFC
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="fixed-wireless" className="border-gray-300" />
                <Label htmlFor="fixed-wireless" className="text-gray-700">
                  Fixed Wireless
                </Label>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>

        {/* Providers Filter */}
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

              <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                {filteredProviders.length > 0 ? (
                  filteredProviders.map((provider) => (
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
                  ))
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
          <Button variant="outline" size="sm" className="border-gray-300">
            Clear all
          </Button>
          <Button
            size="sm"
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
          >
            Apply filters
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}

function MobileFiltersPanel() {
  const [providers, setProviders] = useState([
    { id: 'm-telstra', name: 'Telstra', checked: false },
    { id: 'm-optus', name: 'Optus', checked: false },
    { id: 'm-tpg', name: 'TPG', checked: false },
    { id: 'm-aussie', name: 'Aussie Broadband', checked: false },
    { id: 'm-myrepublic', name: 'MyRepublic', checked: false },
    { id: 'm-superloop', name: 'Superloop', checked: false },
    { id: 'm-exetel', name: 'Exetel', checked: false },
    { id: 'm-dodo', name: 'Dodo', checked: false },
  ]);
  const [providerSearch, setProviderSearch] = useState('');
  const [hasPromotion, setHasPromotion] = useState(false);

  const filteredProviders = providers.filter((provider) =>
    provider.name.toLowerCase().includes(providerSearch.toLowerCase())
  );

  return (
    <div className="space-y-4">
      {/* Price Range Filter */}
      <Collapsible className="w-full">
        <CollapsibleTrigger className="flex items-center justify-between w-full p-3 bg-white rounded-md hover:bg-gray-50 transition-colors border border-gray-200 shadow-sm">
          <span className="text-gray-900">Price range</span>
          <ChevronDown className="h-4 w-4 text-gray-500" />
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-2 p-3 bg-white rounded-md border border-gray-200 shadow-sm">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox id="m-price-50-75" className="border-gray-300" />
              <Label htmlFor="m-price-50-75" className="text-gray-700">
                $50 - $75
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="m-price-75-100" className="border-gray-300" />
              <Label htmlFor="m-price-75-100" className="text-gray-700">
                $75 - $100
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="m-price-100-125" className="border-gray-300" />
              <Label htmlFor="m-price-100-125" className="text-gray-700">
                $100 - $125
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="m-price-125-150" className="border-gray-300" />
              <Label htmlFor="m-price-125-150" className="text-gray-700">
                $125 - $150
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="m-price-150+" className="border-gray-300" />
              <Label htmlFor="m-price-150+" className="text-gray-700">
                $150+
              </Label>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* Has Promotion Toggle */}
      <div className="flex items-center justify-between p-3 bg-white rounded-md border border-gray-200 shadow-sm">
        <span className="text-gray-900">Has promotion</span>
        <Switch checked={hasPromotion} onCheckedChange={setHasPromotion} />
      </div>

      {/* Speed Down Filter */}
      <Collapsible className="w-full">
        <CollapsibleTrigger className="flex items-center justify-between w-full p-3 bg-white rounded-md hover:bg-gray-50 transition-colors border border-gray-200 shadow-sm">
          <span className="text-gray-900">Speed - down</span>
          <ChevronDown className="h-4 w-4 text-gray-500" />
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-2 p-3 bg-white rounded-md border border-gray-200 shadow-sm">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox id="m-speed-25" className="border-gray-300" />
              <Label htmlFor="m-speed-25" className="text-gray-700">
                25 Mbps
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="m-speed-50" className="border-gray-300" />
              <Label htmlFor="m-speed-50" className="text-gray-700">
                50 Mbps
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="m-speed-100" className="border-gray-300" />
              <Label htmlFor="m-speed-100" className="text-gray-700">
                100 Mbps
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="m-speed-250" className="border-gray-300" />
              <Label htmlFor="m-speed-250" className="text-gray-700">
                250 Mbps
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="m-speed-1000" className="border-gray-300" />
              <Label htmlFor="m-speed-1000" className="text-gray-700">
                1000 Mbps
              </Label>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* Speed Up Filter */}
      <Collapsible className="w-full">
        <CollapsibleTrigger className="flex items-center justify-between w-full p-3 bg-white rounded-md hover:bg-gray-50 transition-colors border border-gray-200 shadow-sm">
          <span className="text-gray-900">Speed - up</span>
          <ChevronDown className="h-4 w-4 text-gray-500" />
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-2 p-3 bg-white rounded-md border border-gray-200 shadow-sm">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox id="m-up-5" className="border-gray-300" />
              <Label htmlFor="m-up-5" className="text-gray-700">
                5 Mbps
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="m-up-20" className="border-gray-300" />
              <Label htmlFor="m-up-20" className="text-gray-700">
                20 Mbps
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="m-up-40" className="border-gray-300" />
              <Label htmlFor="m-up-40" className="text-gray-700">
                40 Mbps
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="m-up-100" className="border-gray-300" />
              <Label htmlFor="m-up-100" className="text-gray-700">
                100 Mbps
              </Label>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* Fibre Type Filter */}
      <Collapsible className="w-full">
        <CollapsibleTrigger className="flex items-center justify-between w-full p-3 bg-white rounded-md hover:bg-gray-50 transition-colors border border-gray-200 shadow-sm">
          <span className="text-gray-900">Fibre type</span>
          <ChevronDown className="h-4 w-4 text-gray-500" />
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-2 p-3 bg-white rounded-md border border-gray-200 shadow-sm">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox id="m-fttp" className="border-gray-300" />
              <Label htmlFor="m-fttp" className="text-gray-700">
                FTTP
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="m-fttn" className="border-gray-300" />
              <Label htmlFor="m-fttn" className="text-gray-700">
                FTTN
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="m-fttc" className="border-gray-300" />
              <Label htmlFor="m-fttc" className="text-gray-700">
                FTTC
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="m-hfc" className="border-gray-300" />
              <Label htmlFor="m-hfc" className="text-gray-700">
                HFC
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="m-fixed-wireless" className="border-gray-300" />
              <Label htmlFor="m-fixed-wireless" className="text-gray-700">
                Fixed Wireless
              </Label>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* Providers Filter */}
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

            <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
              {filteredProviders.length > 0 ? (
                filteredProviders.map((provider) => (
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
                ))
              ) : (
                <p className="text-sm text-gray-500">No providers found</p>
              )}
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>

      <div className="flex justify-between w-full pt-2">
        <Button variant="outline" size="sm" className="border-gray-300">
          Clear all
        </Button>
        <Button
          size="sm"
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
        >
          Apply filters
        </Button>
      </div>
    </div>
  );
}
