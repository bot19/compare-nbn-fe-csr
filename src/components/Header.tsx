import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';

export function Header() {
  return (
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
  );
}
