import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ResultsSkeletonProps {
  accentColor?: "primary" | "accent" | "secondary" | "tertiary";
}

const ResultsSkeleton = ({ accentColor = "primary" }: ResultsSkeletonProps) => {
  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header skeleton */}
      <div className="space-y-4 text-center">
        <Skeleton className="mx-auto h-8 w-64" />
        <div className="flex flex-wrap justify-center gap-2">
          {[1, 2, 3, 4, 5].map((i) => (
            <Skeleton key={i} className="h-7 w-24 rounded-full" />
          ))}
        </div>
      </div>

      {/* Top pick skeleton (large card) */}
      <Card
        className={cn(
          "border-2 p-6",
          accentColor === "primary" && "border-primary/20",
          accentColor === "accent" && "border-accent/20",
          accentColor === "secondary" && "border-border",
          accentColor === "tertiary" && "border-violet-500/20"
        )}
      >
        <div className="space-y-4">
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <Skeleton className="h-5 w-24" />
              <Skeleton className="h-7 w-48" />
              <Skeleton className="h-4 w-24" />
            </div>
            <div className="text-right">
              <Skeleton className="ml-auto h-10 w-16" />
              <Skeleton className="ml-auto mt-1 h-3 w-20" />
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-6 w-16" />
            ))}
          </div>

          <div className="space-y-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-2">
                <Skeleton className="h-4 w-4 rounded" />
                <Skeleton className="h-4 w-48" />
              </div>
            ))}
          </div>

          <Skeleton className="h-4 w-24" />
        </div>
      </Card>

      {/* Secondary picks skeleton (2 medium cards) */}
      <div className="grid gap-4 sm:grid-cols-2">
        {[2, 3].map((rank) => (
          <Card key={rank} className="border p-6">
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <Skeleton className="h-5 w-20" />
                  <Skeleton className="h-6 w-40" />
                  <Skeleton className="h-4 w-20" />
                </div>
                <div className="text-right">
                  <Skeleton className="ml-auto h-8 w-14" />
                  <Skeleton className="ml-auto mt-1 h-3 w-16" />
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-6 w-14" />
                ))}
              </div>

              <div className="space-y-2">
                {[1, 2].map((i) => (
                  <div key={i} className="flex items-center gap-2">
                    <Skeleton className="h-4 w-4 rounded" />
                    <Skeleton className="h-4 w-36" />
                  </div>
                ))}
              </div>

              <Skeleton className="h-4 w-20" />
            </div>
          </Card>
        ))}
      </div>

      {/* Alternates section */}
      <div className="space-y-4">
        <Skeleton className="h-6 w-32" />
        <div className="grid gap-4 sm:grid-cols-2">
          {[1, 2].map((i) => (
            <Card key={i} className="border p-4">
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div className="space-y-1.5">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-5 w-32" />
                    <Skeleton className="h-3 w-16" />
                  </div>
                  <Skeleton className="h-6 w-12" />
                </div>
                <div className="flex gap-2">
                  {[1, 2].map((j) => (
                    <Skeleton key={j} className="h-5 w-12" />
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ResultsSkeleton;
