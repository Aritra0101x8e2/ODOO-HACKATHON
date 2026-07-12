import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";


const data = [
  {
    month: "Jan",
    utilization: 62,
  },

  {
    month: "Feb",
    utilization: 70,
  },

  {
    month: "Mar",
    utilization: 68,
  },

  {
    month: "Apr",
    utilization: 76,
  },

  {
    month: "May",
    utilization: 81,
  },

  {
    month: "Jun",
    utilization: 78,
  },
];


export default function FleetUtilizationChart(){

return(

<Card className="border-zinc-800 bg-zinc-900">


<CardHeader>

<CardTitle className="text-white">
Fleet Utilization
</CardTitle>

</CardHeader>


<CardContent>


<div className="h-[350px] w-full">


<ResponsiveContainer width="100%" height="100%">


<AreaChart data={data}>


<CartesianGrid
strokeDasharray="3 3"
/>


<XAxis
dataKey="month"
stroke="#71717a"
/>


<YAxis
stroke="#71717a"
/>


<Tooltip/>


<Area

type="monotone"

dataKey="utilization"

stroke="#8b5cf6"

fill="#8b5cf6"

fillOpacity={0.2}

/>


</AreaChart>


</ResponsiveContainer>


</div>


</CardContent>


</Card>

);

}