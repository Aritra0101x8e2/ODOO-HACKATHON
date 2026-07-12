import {
  AlertTriangle,
  Clock,
  CheckCircle2,
} from "lucide-react";

const alerts = [
  {
    vehicle: "WB12AB4589",
    issue: "Engine Service",
    priority: "High",
    due: "Today",
  },
  {
    vehicle: "WB18KL9021",
    issue: "Oil Change",
    priority: "Medium",
    due: "Tomorrow",
  },
  {
    vehicle: "WB05CD1145",
    issue: "Brake Inspection",
    priority: "Low",
    due: "3 Days",
  },
];

function badge(priority: string) {
  switch (priority) {
    case "High":
      return "bg-red-500/15 text-red-400 border-red-500/30";
    case "Medium":
      return "bg-yellow-500/15 text-yellow-400 border-yellow-500/30";
    default:
      return "bg-green-500/15 text-green-400 border-green-500/30";
  }
}

export default function MaintenanceAlerts() {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-white">
          Maintenance Alerts
        </h2>

        <AlertTriangle className="h-5 w-5 text-yellow-400" />
      </div>

      <div className="space-y-4">
        {alerts.map((alert) => (
          <div
            key={alert.vehicle}
            className="rounded-xl border border-zinc-800 bg-zinc-950 p-4 transition hover:border-blue-500"
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-white">
                  {alert.vehicle}
                </h3>

                <p className="mt-1 text-sm text-zinc-400">
                  {alert.issue}
                </p>
              </div>

              <span
                className={`rounded-full border px-3 py-1 text-xs font-medium ${badge(
                  alert.priority
                )}`}
              >
                {alert.priority}
              </span>
            </div>

            <div className="mt-4 flex items-center justify-between text-sm text-zinc-400">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Due: {alert.due}
              </div>

              <CheckCircle2 className="h-4 w-4 text-green-400" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}