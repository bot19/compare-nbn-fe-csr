import { ChevronRight, ChevronLeft, Info, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { APP_SETTINGS } from '@/lib/settings';
import type { NBNPlan } from '@/types/nbn';

interface PlansListProps {
  plans: NBNPlan[];
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  onPageChange: (page: number) => void;
}

export function PlansList({
  plans,
  currentPage,
  totalPages,
  hasNextPage,
  hasPrevPage,
  onPageChange,
}: PlansListProps) {
  if (plans.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No plans found matching your criteria.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {plans.map((plan) => (
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
            disabled={!hasPrevPage}
            onClick={() => onPageChange(currentPage - 1)}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-sm">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            disabled={!hasNextPage}
            onClick={() => onPageChange(currentPage + 1)}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        <span className="text-sm text-gray-500">
          {plans.length} of {plans.length} plans (page {currentPage})
        </span>
      </div>
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
