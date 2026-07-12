import {
  Truck,
  Users,
  Route,
  Wrench,
} from "lucide-react";

import KPI from "../../common/KPI/KPI";

export default function FleetOverview() {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

      <KPI
        title="Vehicles"
        value="128"
        subtitle="12 added this month"
        icon={<Truck size={22} />}
      />

      <KPI
        title="Drivers"
        value="84"
        subtitle="79 active"
        icon={<Users size={22} />}
      />

      <KPI
        title="Trips"
        value="356"
        subtitle="28 running"
        icon={<Route size={22} />}
      />

      <KPI
        title="Maintenance"
        value="14"
        subtitle="Scheduled"
        icon={<Wrench size={22} />}
      />

    </div>
  );
}