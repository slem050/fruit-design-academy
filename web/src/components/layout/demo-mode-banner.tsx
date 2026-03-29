import type { ReactElement } from "react";

type DemoModeBannerProps = {
  visible: boolean;
};

export function DemoModeBanner({ visible }: DemoModeBannerProps): ReactElement | null {
  if (!visible) {
    return null;
  }

  return (
    <div className="border-b border-amber-200 bg-amber-50 px-4 py-2 text-center text-xs font-medium text-amber-950 sm:text-sm">
      Demo mode — mock authentication and API responses. Set <code className="rounded bg-amber-100 px-1">DEMO_MODE=false</code> in
      production when real services are connected.
    </div>
  );
}
