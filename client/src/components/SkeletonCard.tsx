import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function BusCardSkeleton() {
  return (
    <Card className="overflow-hidden">
      <Skeleton className="aspect-video w-full" />
      <CardHeader>
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-1/2 mt-2" />
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-2">
          <Skeleton className="h-6 w-16" />
          <Skeleton className="h-6 w-16" />
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-6 w-16" />
        </div>
        <div className="flex justify-between items-center">
          <div>
            <Skeleton className="h-8 w-32" />
            <Skeleton className="h-4 w-20 mt-1" />
          </div>
          <Skeleton className="h-10 w-20" />
        </div>
      </CardContent>
    </Card>
  );
}

export function RouteCardSkeleton() {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div className="flex-1 space-y-2">
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
          <Skeleton className="h-8 w-24" />
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </CardContent>
    </Card>
  );
}

export function TestimonialCardSkeleton() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2 flex-1">
            <Skeleton className="h-5 w-32" />
            <div className="flex gap-1">
              <Skeleton className="h-4 w-4" />
              <Skeleton className="h-4 w-4" />
              <Skeleton className="h-4 w-4" />
              <Skeleton className="h-4 w-4" />
              <Skeleton className="h-4 w-4" />
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
      </CardContent>
    </Card>
  );
}

export function PromoCardSkeleton() {
  return (
    <Card>
      <CardHeader className="space-y-3">
        <Skeleton className="h-6 w-24" />
        <Skeleton className="h-7 w-3/4" />
        <Skeleton className="h-4 w-full" />
      </CardHeader>
      <CardContent className="space-y-3">
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="h-10 w-full" />
      </CardContent>
    </Card>
  );
}
