import DataTable from "../common/DataTable/DataTable";


interface Trip {

id:number;

source:string;

destination:string;

vehicle:string;

status:string;

}



const trips:Trip[]=[

{
id:1,
source:"Kolkata",
destination:"Delhi",
vehicle:"WB-01-A1234",
status:"Completed"
},

{
id:2,
source:"Mumbai",
destination:"Pune",
vehicle:"MH-04-B3321",
status:"On Trip"
},

{
id:3,
source:"Chennai",
destination:"Bangalore",
vehicle:"TN-07-C5512",
status:"Pending"
}

];


export default function RecentTripsTable(){

return(

<div>

<h2 className="mb-4 text-xl font-bold text-white">
Recent Trips
</h2>


<DataTable

data={trips}

columns={[

{
key:"source",
title:"Source"
},

{
key:"destination",
title:"Destination"
},

{
key:"vehicle",
title:"Vehicle"
},

{
key:"status",
title:"Status"
}

]}

/>

</div>

);

}