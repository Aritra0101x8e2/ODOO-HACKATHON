import {
useEffect,
useMemo,
useState
} from "react";


import PageHeader from "../../components/common/PageHeader/PageHeader";


import VehicleStats from "../../components/vehicles/VehicleStats/VehicleStats";


import VehicleFilters from "../../components/vehicles/VehicleFilters/VehicleFilters";


import VehicleTable from "../../components/vehicles/VehicleTable/VehicleTable";


import {
getVehicles
} from "../../services/vehicleService";


import type {
Vehicle
} from "../../types/vehicle";




export default function VehicleList(){


const [vehicles,setVehicles]=useState<Vehicle[]>([]);


const [search,setSearch]=useState("");

const [status,setStatus]=useState("");

const [type,setType]=useState("");



useEffect(()=>{

getVehicles()

.then(setVehicles);

},[]);




const filteredVehicles = useMemo(()=>{


return vehicles.filter((vehicle)=>{


const matchesSearch =

vehicle.registrationNumber
.toLowerCase()
.includes(search.toLowerCase())

||

vehicle.vehicleName
.toLowerCase()
.includes(search.toLowerCase());



const matchesStatus =

status

?

vehicle.status===status

:

true;



const matchesType =

type

?

vehicle.type===type

:

true;



return (

matchesSearch

&&

matchesStatus

&&

matchesType

);


});


},[
vehicles,
search,
status,
type
]);



return(

<div className="space-y-8">


<PageHeader

title="Vehicle Registry"

subtitle="Manage fleet vehicles and operational status"

/>



<VehicleStats

vehicles={vehicles}

/>



<VehicleFilters


search={search}

status={status}

type={type}

onSearch={setSearch}

onStatusChange={setStatus}

onTypeChange={setType}


/>



<VehicleTable

vehicles={filteredVehicles}

/>



</div>

);

}