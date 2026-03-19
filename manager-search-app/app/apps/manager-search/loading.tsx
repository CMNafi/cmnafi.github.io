import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-6 px-5 py-10 sm:px-8 lg:px-10">
      <Card>
        <CardHeader>
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-14 w-full max-w-4xl" />
          <Skeleton className="h-5 w-full max-w-3xl" />
        </CardHeader>
        <CardContent className="grid gap-4 lg:grid-cols-2">
          <Skeleton className="h-44 w-full" />
          <Skeleton className="h-44 w-full" />
        </CardContent>
      </Card>
      <div className="grid gap-6 lg:grid-cols-2">
        <Skeleton className="h-96 w-full rounded-3xl" />
        <Skeleton className="h-96 w-full rounded-3xl" />
      </div>
    </div>
  );
}

