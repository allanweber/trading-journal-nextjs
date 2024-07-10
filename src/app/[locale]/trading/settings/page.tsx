import { Separator } from '@/components/ui/separator';

export default function Page() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">General</h3>
        <p className="text-sm text-muted-foreground">
          Configure your general settings for the application.
        </p>
      </div>
      <Separator />
    </div>
  );
}
