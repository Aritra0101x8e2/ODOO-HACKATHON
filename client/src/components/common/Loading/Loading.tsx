import { Loader2 } from "lucide-react";

interface LoadingProps {
  text?: string;
}

export default function Loading({
  text = "Loading...",
}: LoadingProps) {
  return (
    <div className="flex min-h-[250px] flex-col items-center justify-center gap-4">
      <Loader2
        className="animate-spin text-violet-500"
        size={36}
      />

      <p className="text-zinc-400">
        {text}
      </p>
    </div>
  );
}