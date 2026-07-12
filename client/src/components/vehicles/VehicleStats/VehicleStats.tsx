import KPI from "../../common/KPI/KPI";

import {
Truck,
CheckCircle,
Route,
Wrench
} from "lucide-react";


interface Props{

vehicles:any[];

}


export default function VehicleStats({
vehicles
}:Props){


const stats=[

{
title:"Total Vehicles",
value:vehicles.length,
icon:<Truck/>
},

{
title:"Available",
value:
vehicles.filter(
v=>v.status==="Available"
).length,
icon:<CheckCircle/>
},

{
title:"On Trip",
value:
vehicles.filter(
v=>v.status==="On Trip"
).length,
icon:<Route/>
},

{
title:"In Shop",
value:
vehicles.filter(
v=>v.status==="In Shop"
).length,
icon:<Wrench/>
}

];


return(

<div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">


{
stats.map(stat=>(

<KPI

key={stat.title}

title={stat.title}

value={stat.value}

icon={stat.icon}

/>

))
}


</div>

);


}