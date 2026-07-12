import { Badge } from "@/components/ui/badge";

interface Props {
  status: string;
}

const variants: Record<string, string> = {
  Available: "bg-green-500/20 text-green-400 border-green-500/30",
  "On Trip": "bg-blue-500/20 text-blue-400 border-blue-500/30",
  "In Shop": "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  Retired: "bg-red-500/20 text-red-400 border-red-500/30",
  Suspended: "bg-red-500/20 text-red-400 border-red-500/30",
  "Off Duty": "bg-zinc-600/20 text-zinc-300 border-zinc-500/30",
};

export default function StatusBadge({ status }: Props) {
  return (
    <Badge
      className={`border ${
        variants[status] ??
        "border-zinc-700 bg-zinc-700/20 text-zinc-200"
      }`}
    >
      {status}
    </Badge>
  );
}