"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Error({
  error,
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-3xl items-center px-5 py-10 sm:px-8">
      <Card className="w-full">
        <CardHeader>
          <p className="text-xs uppercase tracking-[0.24em] text-stone-500">Manager Search</p>
          <CardTitle>Something interrupted the dashboard flow.</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-sm leading-6 text-stone-300">
          <p>
            The current manager request could not be completed. This can happen when a filing record is missing, an exempt
            reporting adviser omits fields, or an external API times out.
          </p>
          <p className="rounded-2xl border border-red-400/20 bg-red-400/5 p-4 text-stone-200">{error.message}</p>
          <Button onClick={reset}>Try again</Button>
        </CardContent>
      </Card>
    </div>
  );
}

