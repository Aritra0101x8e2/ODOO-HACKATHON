import { useEffect, useMemo, useState } from "react";

import { toast } from "sonner";

import PageHeader from "../../components/common/PageHeader/PageHeader";
import VehicleStats from "../../components/vehicles/VehicleStats/VehicleStats";
import VehicleFilters from "../../components/vehicles/VehicleFilters/VehicleFilters";
import VehicleTable from "../../components/vehicles/VehicleTable/VehicleTable";
import VehicleForm from "../../components/vehicles/VehicleForm/VehicleForm";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import {
  getVehicles,
  createVehicle,
  updateVehicle,
  deleteVehicle,
} from "../../services/vehicleService";

import type { Vehicle } from "../../types/vehicle";

export default function VehicleList() {

  const [vehicles, setVehicles] = useState<Vehicle[]>([]);

  const [search, setSearch] = useState("");

  const [status, setStatus] = useState("");

  const [type, setType] = useState("");

  const [open, setOpen] = useState(false);

  const [selectedVehicle, setSelectedVehicle] =
    useState<Vehicle | null>(null);



  useEffect(() => {

    getVehicles()
      .then(setVehicles);

  }, []);




  const filteredVehicles = useMemo(() => {

    return vehicles.filter((vehicle) => {

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
          ? vehicle.status === status
          : true;



      const matchesType =
        type
          ? vehicle.type === type
          : true;



      return (
        matchesSearch &&
        matchesStatus &&
        matchesType
      );

    });


  }, [
    vehicles,
    search,
    status,
    type
  ]);





  async function handleSaveVehicle(vehicle: Vehicle) {

  try {


    if(selectedVehicle){

      const updated =
        await updateVehicle(
          vehicle.id,
          vehicle
        );


      setVehicles((prev)=>
        prev.map((v)=>
          v.id === updated.id
          ? updated
          : v
        )
      );


      toast.success(
        "Vehicle updated successfully."
      );


    }
    else{


      const created =
        await createVehicle(vehicle);


      setVehicles((prev)=>[
        ...prev,
        created
      ]);


      toast.success(
        "Vehicle added successfully."
      );


    }



    setOpen(false);

    setSelectedVehicle(null);



  }
  catch(error){

    toast.error(
      "Vehicle operation failed."
    );

  }

}





  async function handleDelete(vehicle: Vehicle){

  try{


    await deleteVehicle(
      vehicle.id
    );


    setVehicles((prev)=>
      prev.filter(
        (v)=>v.id !== vehicle.id
      )
    );


    toast.success(
      "Vehicle deleted successfully."
    );


  }
  catch(error){

    toast.error(
      "Delete failed."
    );

  }

}





  function handleEdit(vehicle: Vehicle){

    setSelectedVehicle(vehicle);

    setOpen(true);

  }






  return (

    <div className="space-y-8">


      <PageHeader

        title="Vehicle Registry"

        subtitle="Manage your fleet vehicles"

        actions={

          <Button
            onClick={()=>{
              setSelectedVehicle(null);
              setOpen(true);
            }}
          >

            + Add Vehicle

          </Button>

        }

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

        onEdit={handleEdit}

        onDelete={handleDelete}

      />






      <Dialog

        open={open}

        onOpenChange={(value)=>{

          setOpen(value);

          if(!value){

            setSelectedVehicle(null);

          }

        }}

      >


        <DialogContent className="max-w-3xl rounded-2xl border-zinc-800 bg-zinc-950">


          <DialogHeader>

            <DialogTitle className="text-2xl font-bold">

              {
                selectedVehicle
                ?
                "Edit Vehicle"
                :
                "Add New Vehicle"
              }

            </DialogTitle>

          </DialogHeader>





          <VehicleForm

            vehicle={selectedVehicle}

            onSubmit={handleSaveVehicle}

          />



        </DialogContent>


      </Dialog>



    </div>

  );

}