import type { Vehicle } from "../types/vehicle";


const vehicles: Vehicle[] = [

{
id:"1",
registrationNumber:"WB01AB1234",
vehicleName:"Tata Prima",
type:"Truck",
maxLoadCapacity:12000,
odometer:45000,
acquisitionCost:2500000,
status:"Available"
},

{
id:"2",
registrationNumber:"MH04CD5678",
vehicleName:"Ashok Leyland",
type:"Truck",
maxLoadCapacity:9000,
odometer:67000,
acquisitionCost:1800000,
status:"On Trip"
},

{
id:"3",
registrationNumber:"DL05EF9876",
vehicleName:"Mahindra Bolero",
type:"Van",
maxLoadCapacity:3000,
odometer:34000,
acquisitionCost:900000,
status:"In Shop"
}

];


export async function getVehicles(){

return Promise.resolve(vehicles);

}