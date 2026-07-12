import DataTable from "../../common/DataTable/DataTable";

import StatusBadge from "../../common/StatusBadge/StatusBadge";

import type { Vehicle } from "../../../types/vehicle";



interface Props{

vehicles:Vehicle[];

}



export default function VehicleTable({

vehicles

}:Props){



return(

<DataTable

data={vehicles}

columns={[


{
key:"registrationNumber",

title:"Registration No."
},


{
key:"vehicleName",

title:"Vehicle"
},


{
key:"type",

title:"Type"
},


{
key:"maxLoadCapacity",

title:"Capacity",

render:(value)=>

`${value} Kg`

},


{
key:"odometer",

title:"Odometer",

render:(value)=>

`${value} KM`

},


{
key:"acquisitionCost",

title:"Cost",

render:(value)=>

`₹${Number(value).toLocaleString()}`

},


{
key:"status",

title:"Status",

render:(value)=>

<StatusBadge

status={String(value)}

/>

}


]}

/>

);


}