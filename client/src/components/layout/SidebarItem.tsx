import { NavLink } from "react-router-dom";

interface SidebarItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
}

export default function SidebarItem({
  to,
  icon,
  label,
}: SidebarItemProps) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-3 rounded-xl px-4 py-3 transition-all ${
          isActive
            ? "bg-violet-600 text-white"
            : "text-zinc-400 hover:bg-zinc-800 hover:text-white"
        }`
      }
    >
      {icon}

      <span>{label}</span>
    </NavLink>
  );
}