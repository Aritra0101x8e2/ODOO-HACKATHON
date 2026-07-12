import {
  Truck,
  UserPlus,
  Route,
  Fuel,
  Wrench,
  ArrowRight,
} from "lucide-react";

const actions = [
  {
    title: "Add Vehicle",
    description: "Register a new fleet vehicle",
    icon: Truck,
  },
  {
    title: "Add Driver",
    description: "Create a driver profile",
    icon: UserPlus,
  },
  {
    title: "Schedule Trip",
    description: "Assign vehicle and driver",
    icon: Route,
  },
  {
    title: "Fuel Entry",
    description: "Record fuel transactions",
    icon: Fuel,
  },
  {
    title: "Maintenance",
    description: "Create maintenance request",
    icon: Wrench,
  },
];

export default function QuickActions() {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
      <h2 className="mb-6 text-xl font-semibold text-white">
        Quick Actions
      </h2>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <button
              key={action.title}
              className="group rounded-xl border border-zinc-800 bg-zinc-950 p-5 text-left transition-all duration-300 hover:-translate-y-1 hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/10"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-500/10">
                <Icon className="h-6 w-6 text-blue-400" />
              </div>

              <h3 className="text-lg font-semibold text-white">
                {action.title}
              </h3>

              <p className="mt-2 text-sm text-zinc-400">
                {action.description}
              </p>

              <div className="mt-5 flex items-center text-sm font-medium text-blue-400">
                Open
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}