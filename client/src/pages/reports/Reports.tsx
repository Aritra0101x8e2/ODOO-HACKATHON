import {
  Truck,
  Route,
  Fuel,
  Wrench,
  TrendingUp,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const cards = [
  {
    title: "Fleet Utilization",
    value: "92%",
    icon: Truck,
    color: "text-green-400",
  },
  {
    title: "Trips Completed",
    value: "1,284",
    icon: Route,
    color: "text-blue-400",
  },
  {
    title: "Fuel Cost",
    value: "₹2.46 L",
    icon: Fuel,
    color: "text-yellow-400",
  },
  {
    title: "Maintenance",
    value: "₹74 K",
    icon: Wrench,
    color: "text-red-400",
  },
];

export default function Reports() {
  return (
    <div className="space-y-8">

      <div>
        <h1 className="text-4xl font-bold text-white">
          Reports & Analytics
        </h1>

        <p className="mt-2 text-zinc-400">
          Fleet performance insights and operational analytics.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => {
          const Icon = card.icon;

          return (
            <Card
              key={card.title}
              className="border-zinc-800 bg-zinc-900"
            >
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-sm text-zinc-400">
                  {card.title}
                </CardTitle>

                <Icon
                  className={`h-5 w-5 ${card.color}`}
                />
              </CardHeader>

              <CardContent>
                <div className="text-3xl font-bold text-white">
                  {card.value}
                </div>

                <div className="mt-3 flex items-center gap-2 text-green-400">
                  <TrendingUp size={16} />
                  +12.5% this month
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card className="border-zinc-800 bg-zinc-900">
        <CardHeader>
          <CardTitle>Performance Summary</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4 text-zinc-300">

          <div className="flex justify-between">
            <span>Average Fuel Efficiency</span>
            <span className="font-semibold text-white">
              14.6 km/L
            </span>
          </div>

          <div className="flex justify-between">
            <span>Vehicle Availability</span>
            <span className="font-semibold text-white">
              95%
            </span>
          </div>

          <div className="flex justify-between">
            <span>Maintenance Compliance</span>
            <span className="font-semibold text-white">
              98%
            </span>
          </div>

          <div className="flex justify-between">
            <span>Total Distance Covered</span>
            <span className="font-semibold text-white">
              2.8M km
            </span>
          </div>

        </CardContent>
      </Card>
    </div>
  );
}