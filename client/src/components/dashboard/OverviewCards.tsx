import {
  Truck,
  CheckCircle,
  Wrench,
  Route,
  Clock,
  Users,
  Activity,
} from "lucide-react";

import KPI from "../common/KPI/KPI";


const stats = [
  {
    title: "Active Vehicles",
    value: 235,
    icon: <Truck size={28} />,
    footer: "Vehicles currently operational",
  },

  {
    title: "Available Vehicles",
    value: 182,
    icon: <CheckCircle size={28} />,
    footer: "Ready for dispatch",
  },

  {
    title: "In Maintenance",
    value: 23,
    icon: <Wrench size={28} />,
    footer: "Currently in workshop",
  },

  {
    title: "Active Trips",
    value: 67,
    icon: <Route size={28} />,
    footer: "Trips running now",
  },

  {
    title: "Pending Trips",
    value: 14,
    icon: <Clock size={28} />,
    footer: "Waiting for dispatch",
  },

  {
    title: "Drivers On Duty",
    value: 91,
    icon: <Users size={28} />,
    footer: "Currently assigned",
  },

  {
    title: "Fleet Utilization",
    value: "78%",
    icon: <Activity size={28} />,
    footer: "Overall efficiency",
  },
];


export default function OverviewCards() {
  return (
    <div
      className="
      grid
      gap-6
      sm:grid-cols-2
      xl:grid-cols-4
      "
    >

      {stats.map((item)=>(
        <KPI
          key={item.title}
          title={item.title}
          value={item.value}
          icon={item.icon}
          footer={item.footer}
        />
      ))}

    </div>
  );
}