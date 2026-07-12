import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import type { Vehicle } from "../../../types/vehicle";


interface VehicleFormProps {

  vehicle?: Vehicle | null;

  onSubmit: (vehicle: Vehicle) => void;

}



export default function VehicleForm({

  vehicle,

  onSubmit,

}: VehicleFormProps) {


  const [registrationNumber, setRegistrationNumber] =
    useState("");

  const [vehicleName, setVehicleName] =
    useState("");

  const [type, setType] =
    useState("");

  const [capacity, setCapacity] =
    useState("");

  const [odometer, setOdometer] =
    useState("");

  const [cost, setCost] =
    useState("");




  useEffect(()=>{


    if(vehicle){

      setRegistrationNumber(
        vehicle.registrationNumber
      );

      setVehicleName(
        vehicle.vehicleName
      );

      setType(
        vehicle.type
      );

      setCapacity(
        String(vehicle.maxLoadCapacity)
      );

      setOdometer(
        String(vehicle.odometer)
      );

      setCost(
        String(vehicle.acquisitionCost)
      );


    }
    else{

      clearForm();

    }


  },[vehicle]);





  function clearForm(){

    setRegistrationNumber("");

    setVehicleName("");

    setType("");

    setCapacity("");

    setOdometer("");

    setCost("");

  }





  function submit(){


    if(
      !registrationNumber.trim()
      ||
      !vehicleName.trim()
      ||
      !type.trim()
    ){

      alert(
        "Please fill all required fields."
      );

      return;

    }




    const newVehicle: Vehicle = {


      id:

        vehicle

        ?

        vehicle.id

        :

        crypto.randomUUID(),



      registrationNumber,


      vehicleName,


      type,


      maxLoadCapacity:
        Number(capacity),



      odometer:
        Number(odometer),



      acquisitionCost:
        Number(cost),



      status:

        vehicle

        ?

        vehicle.status

        :

        "Available",


    };




    onSubmit(newVehicle);



    clearForm();


  }






  return (

    <div className="space-y-6">


      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">



        <div className="space-y-2">

          <Label>
            Registration Number *
          </Label>

          <Input

            value={registrationNumber}

            onChange={(e)=>
              setRegistrationNumber(
                e.target.value
              )
            }

            placeholder="WB01AB1234"

          />

        </div>





        <div className="space-y-2">

          <Label>
            Vehicle Name *
          </Label>

          <Input

            value={vehicleName}

            onChange={(e)=>
              setVehicleName(
                e.target.value
              )
            }

            placeholder="Tata Prima"

          />

        </div>





        <div className="space-y-2">

          <Label>
            Vehicle Type *
          </Label>

          <Input

            value={type}

            onChange={(e)=>
              setType(
                e.target.value
              )
            }

            placeholder="Truck"

          />

        </div>





        <div className="space-y-2">

          <Label>
            Load Capacity (Kg)
          </Label>

          <Input

            type="number"

            value={capacity}

            onChange={(e)=>
              setCapacity(
                e.target.value
              )
            }

            placeholder="16000"

          />

        </div>





        <div className="space-y-2">

          <Label>
            Odometer (KM)
          </Label>

          <Input

            type="number"

            value={odometer}

            onChange={(e)=>
              setOdometer(
                e.target.value
              )
            }

            placeholder="500"

          />

        </div>





        <div className="space-y-2">

          <Label>
            Acquisition Cost (₹)
          </Label>

          <Input

            type="number"

            value={cost}

            onChange={(e)=>
              setCost(
                e.target.value
              )
            }

            placeholder="2800000"

          />

        </div>



      </div>





      <div className="flex justify-end gap-3 border-t border-zinc-800 pt-5">


        <Button

          variant="outline"

          onClick={clearForm}

        >

          Clear

        </Button>





        <Button

          onClick={submit}

        >

          {
            vehicle
            ?
            "Update Vehicle"
            :
            "Add Vehicle"
          }


        </Button>



      </div>



    </div>

  );

}