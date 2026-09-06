"use client";

import { ComponentType, lazy, Suspense } from "react";

interface LazyLoadWrapperProps {
  fallback?: React.ReactNode;
}

export function lazyLoadComponent<T extends ComponentType<any>>(
  importFunc: () => Promise<{ default: T }>,
  fallback: React.ReactNode = (
    <div className="flex min-h-[200px] items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
    </div>
  ),
) {
  const LazyComponent = lazy(importFunc);

  return function LazyLoadWrapper(props: any) {
    return (
      <Suspense fallback={fallback}>
        <LazyComponent {...props} />
      </Suspense>
    );
  };
}

export default lazyLoadComponent;
