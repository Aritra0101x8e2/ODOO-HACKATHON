import {
  Plus,
  Truck,
  UserPlus,
} from "lucide-react";


const actions=[

{
name:"Add Vehicle",
icon:<Truck size={20}/>
},

{
name:"Create Trip",
icon:<Plus size={20}/>
},

{
name:"Add Driver",
icon:<UserPlus size={20}/>
}

];


export default function QuickActions(){


return(

<div>

<h2 className="mb-4 text-xl font-bold text-white">
Quick Actions
</h2>


<div className="grid gap-4 md:grid-cols-3">


{
actions.map((action)=>(

<button

key={action.name}

className="flex items-center gap-3 rounded-xl border border-zinc-800 bg-zinc-900 p-5 text-zinc-300 transition hover:border-violet-500 hover:text-white"

>

{action.icon}

{action.name}

</button>

))

}


</div>


</div>

);

}