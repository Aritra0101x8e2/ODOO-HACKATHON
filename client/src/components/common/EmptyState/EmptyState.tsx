import { Inbox } from "lucide-react";

interface EmptyStateProps {
  title: string;
  description?: string;
}

export default function EmptyState({
  title,
  description,
}: EmptyStateProps) {
  return (
    <div className="flex min-h-[300px] flex-col items-center justify-center rounded-2xl border border-dashed border-zinc-700 bg-zinc-900 p-8 text-center">
      <Inbox
        size={52}
        className="mb-5 text-zinc-600"
      />

      <h2 className="text-xl font-semibold text-white">
        {title}
      </h2>

      {description && (
        <p className="mt-3 max-w-md text-zinc-400">
          {description}
        </p>
      )}
    </div>
  );
}