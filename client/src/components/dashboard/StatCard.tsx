import type { ReactNode } from "react";

interface StatCardProps {
  title: string;

  value: string | number;

  subtitle?: string;

  icon: ReactNode;
}

export default function StatCard({
  title,
  value,
  subtitle,
  icon,
}: StatCardProps) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 shadow-lg transition-all duration-300 hover:border-violet-500">
      <div className="flex items-center justify-between">

        <div>

          <p className="text-sm text-zinc-500">
            {title}
          </p>

          <h2 className="mt-3 text-4xl font-bold text-white">
            {value}
          </h2>

          {subtitle && (
            <p className="mt-2 text-sm text-zinc-400">
              {subtitle}
            </p>
          )}

        </div>

        <div className="rounded-xl bg-violet-600/20 p-4 text-violet-400">
          {icon}
        </div>

      </div>
    </div>
  );
}