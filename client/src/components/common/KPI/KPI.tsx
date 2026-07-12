import type { ReactNode } from "react";
import { Card, CardContent } from "@/components/ui/card";

interface KPIProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  footer?: string;
}

export default function KPI({
  title,
  value,
  icon,
  footer,
}: KPIProps) {
  return (
    <Card className="border-zinc-800 bg-zinc-900 transition-all duration-300 hover:border-violet-500">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-zinc-400">
              {title}
            </p>

            <h2 className="mt-3 text-4xl font-bold text-white">
              {value}
            </h2>

            {footer && (
              <p className="mt-3 text-xs text-zinc-500">
                {footer}
              </p>
            )}
          </div>

          <div className="rounded-xl bg-violet-600/20 p-3 text-violet-400">
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}