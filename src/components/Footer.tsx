import { Card, CardContent } from '@/components/ui/card';

export function Footer() {
  return (
    <Card className="bg-white border border-gray-200 shadow-sm">
      <CardContent className="py-4">
        <div className="flex justify-center items-center space-x-4 text-sm text-gray-500">
          <span>© 2025 NBN Compare</span>
          <span>|</span>
          <span>Terms</span>
        </div>
      </CardContent>
    </Card>
  );
}
