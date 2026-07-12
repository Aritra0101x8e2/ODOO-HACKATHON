import {
  AlertTriangle,
} from "lucide-react";


const alerts=[

"Vehicle WB-01-A1234 requires engine service",

"Vehicle MH-04-B3321 oil replacement due",

"Vehicle DL-09-C4421 inspection pending"

];


export default function MaintenanceAlerts(){

return(

<div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">


<div className="mb-5 flex items-center gap-3">

<AlertTriangle
className="text-yellow-400"
/>

<h2 className="text-xl font-bold text-white">
Maintenance Alerts
</h2>

</div>


<div className="space-y-3">

{
alerts.map((alert)=>(
<div

key={alert}

className="rounded-xl bg-zinc-800 p-4 text-sm text-zinc-300"

>

{alert}

</div>
))
}


</div>


</div>

);

}