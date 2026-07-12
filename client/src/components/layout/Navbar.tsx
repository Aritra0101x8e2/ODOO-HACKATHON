import { Bell, Search } from "lucide-react";

import { useAuth } from "../../hooks/useAuth";

export default function Navbar() {
  const { user } = useAuth();

  return (
    <header className="flex h-20 items-center justify-between border-b border-zinc-800 bg-zinc-950 px-8">
      <div className="flex items-center gap-3 rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-2">
        <Search size={18} />

        <input
          placeholder="Search..."
          className="bg-transparent outline-none"
        />
      </div>

      <div className="flex items-center gap-6">
        <Bell />

        <div className="text-right">
          <p className="font-semibold">
            {user?.name ?? "Guest"}
          </p>

          <p className="text-sm text-zinc-500">
            {user?.role ?? "-"}
          </p>
        </div>
      </div>
    </header>
  );
}