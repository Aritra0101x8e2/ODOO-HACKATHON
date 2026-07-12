import {
  LayoutDashboard,
  Truck,
  Users,
  RouteIcon,
  Wrench,
  Fuel,
  BarChart3,
  User,
  LogOut,
} from "lucide-react";
import { NavLink } from "react-router-dom";

import { ROUTES } from "../../constants/routes";
import { useAuth } from "../../hooks/useAuth";

const menuItems = [
  {
    title: "Dashboard",
    path: ROUTES.DASHBOARD,
    icon: LayoutDashboard,
  },
  {
    title: "Vehicles",
    path: ROUTES.VEHICLES,
    icon: Truck,
  },
  {
    title: "Drivers",
    path: ROUTES.DRIVERS,
    icon: Users,
  },
  {
    title: "Trips",
    path: ROUTES.TRIPS,
    icon: RouteIcon,
  },
  {
    title: "Maintenance",
    path: ROUTES.MAINTENANCE,
    icon: Wrench,
  },
  {
    title: "Fuel & Expense",
    path: ROUTES.FUEL,
    icon: Fuel,
  },
  {
    title: "Reports",
    path: ROUTES.REPORTS,
    icon: BarChart3,
  },
  {
    title: "Profile",
    path: ROUTES.PROFILE,
    icon: User,
  },
];

export default function Sidebar() {
  const { logout } = useAuth();

  return (
    <aside className="flex h-screen w-72 flex-col border-r border-zinc-800 bg-zinc-950">
      <div className="border-b border-zinc-800 p-6">
        <h1 className="text-2xl font-bold text-violet-500">
          Fleet ERP
        </h1>

        <p className="mt-1 text-sm text-zinc-500">
          Fleet Management System
        </p>
      </div>

      <nav className="flex-1 space-y-2 p-4">
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.title}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-4 py-3 transition ${
                  isActive
                    ? "bg-violet-600 text-white"
                    : "text-zinc-400 hover:bg-zinc-900 hover:text-white"
                }`
              }
            >
              <Icon size={20} />
              <span>{item.title}</span>
            </NavLink>
          );
        })}
      </nav>

      <div className="border-t border-zinc-800 p-4">
        <button
          onClick={logout}
          className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-red-400 transition hover:bg-red-500/10"
        >
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </aside>
  );
}