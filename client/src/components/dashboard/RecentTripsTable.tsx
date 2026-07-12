import {
  MapPin,
  ArrowRight,
  Clock,
} from "lucide-react";

const trips = [
  {
    id: "TRP-1001",
    vehicle: "Tata Prima",
    driver: "Rahul Sharma",
    route: "Kolkata → Durgapur",
    status: "On Trip",
    eta: "2 hrs",
  },
  {
    id: "TRP-1002",
    vehicle: "Ashok Leyland",
    driver: "Amit Das",
    route: "Howrah → Siliguri",
    status: "Completed",
    eta: "-",
  },
  {
    id: "TRP-1003",
    vehicle: "Eicher Pro",
    driver: "Sourav Roy",
    route: "Kolkata → Asansol",
    status: "Delayed",
    eta: "4 hrs",
  },
  {
    id: "TRP-1004",
    vehicle: "Mahindra Blazo",
    driver: "Arjun Singh",
    route: "Kolkata → Ranchi",
    status: "Scheduled",
    eta: "Tomorrow",
  },
];

function statusColor(status: string) {
  switch (status) {
    case "Completed":
      return "bg-green-500/15 text-green-400";

    case "On Trip":
      return "bg-blue-500/15 text-blue-400";

    case "Delayed":
      return "bg-red-500/15 text-red-400";

    default:
      return "bg-yellow-500/15 text-yellow-400";
  }
}

export default function RecentTripsTable() {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-white">
          Recent Trips
        </h2>

        <Clock className="h-5 w-5 text-zinc-400" />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-zinc-800">
              <th className="py-3 text-left text-zinc-400">Trip</th>
              <th className="py-3 text-left text-zinc-400">Vehicle</th>
              <th className="py-3 text-left text-zinc-400">Driver</th>
              <th className="py-3 text-left text-zinc-400">Route</th>
              <th className="py-3 text-left text-zinc-400">Status</th>
              <th className="py-3 text-left text-zinc-400">ETA</th>
            </tr>
          </thead>

          <tbody>
            {trips.map((trip) => (
              <tr
                key={trip.id}
                className="border-b border-zinc-800 transition hover:bg-zinc-800/40"
              >
                <td className="py-4 font-medium text-white">
                  {trip.id}
                </td>

                <td className="text-zinc-300">
                  {trip.vehicle}
                </td>

                <td>
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 font-semibold text-white">
                      {trip.driver
                        .split(" ")
                        .map((name) => name[0])
                        .join("")}
                    </div>

                    <span className="text-zinc-300">
                      {trip.driver}
                    </span>
                  </div>
                </td>

                <td>
                  <div className="flex items-center gap-2 text-zinc-300">
                    <MapPin className="h-4 w-4 text-blue-400" />
                    <span>{trip.route}</span>
                  </div>
                </td>

                <td>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${statusColor(
                      trip.status
                    )}`}
                  >
                    {trip.status}
                  </span>
                </td>

                <td className="font-medium text-zinc-300">
                  {trip.eta}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}