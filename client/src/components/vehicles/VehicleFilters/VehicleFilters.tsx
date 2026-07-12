import SearchInput from "../../common/SearchInput/SearchInput";


interface VehicleFiltersProps {

search:string;

status:string;

type:string;

onSearch:(value:string)=>void;

onStatusChange:(value:string)=>void;

onTypeChange:(value:string)=>void;

}



export default function VehicleFilters({

search,

status,

type,

onSearch,

onStatusChange,

onTypeChange

}:VehicleFiltersProps){


return(

<div className="flex flex-col gap-4 rounded-2xl border border-zinc-800 bg-zinc-900 p-5 md:flex-row">


<SearchInput

value={search}

placeholder="Search registration or vehicle..."

onChange={onSearch}

/>



<select

value={status}

onChange={(e)=>onStatusChange(e.target.value)}

className="rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-2 text-white"

>

<option value="">
All Status
</option>

<option value="Available">
Available
</option>

<option value="On Trip">
On Trip
</option>

<option value="In Shop">
In Shop
</option>

<option value="Retired">
Retired
</option>


</select>



<select

value={type}

onChange={(e)=>onTypeChange(e.target.value)}

className="rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-2 text-white"

>

<option value="">
All Types
</option>

<option value="Truck">
Truck
</option>

<option value="Van">
Van
</option>

<option value="Bus">
Bus
</option>


</select>


</div>

);

}