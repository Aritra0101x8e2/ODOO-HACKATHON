import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function GlobalSearch({
  value,
  onChange,
}: Props) {
  return (
    <div className="relative w-full max-w-md">
      <Search
        className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"
        size={18}
      />

      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search vehicles, drivers, trips..."
        className="pl-10"
      />
    </div>
  );
}