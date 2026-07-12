import { useEffect, useMemo, useState } from "react";

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

import { getVehicles } from "../../services/vehicleService";

import type { Vehicle } from "../../types/vehicle";

export default function VehicleList() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [type, setType] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    getVehicles().then(setVehicles);
  }, []);

  const filteredVehicles = useMemo(() => {
    return vehicles.filter((vehicle) => {
      const matchesSearch =
        vehicle.registrationNumber
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        vehicle.vehicleName
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesStatus = status ? vehicle.status === status : true;
      const matchesType = type ? vehicle.type === type : true;

      return matchesSearch && matchesStatus && matchesType;
    });
  }, [vehicles, search, status, type]);

  function handleAddVehicle(vehicle: Vehicle) {
    const exists = vehicles.some(
      (v) =>
        v.registrationNumber.toLowerCase() ===
        vehicle.registrationNumber.toLowerCase()
    );

    if (exists) {
      alert("Vehicle registration already exists.");
      return;
    }

    setVehicles((prev) => [...prev, vehicle]);
    setOpen(false);
  }
  function handleDelete(vehicle: Vehicle) {
  if (
    !window.confirm(
      `Delete ${vehicle.vehicleName}?`
    )
  ) {
    return;
  }

  setVehicles((prev) =>
    prev.filter((v) => v.id !== vehicle.id)
  );
}

function handleEdit(vehicle: Vehicle) {
  alert(
    `Edit functionality for ${vehicle.vehicleName} will be added next.`
  );
}

  return (
    <div className="space-y-8">
     <PageHeader
  title="Vehicle Registry"
  subtitle="Manage your fleet vehicles"
  actions={
    <Button onClick={() => setOpen(true)}>
      + Add Vehicle
    </Button>
  }
/>

      <VehicleStats vehicles={vehicles} />

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

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-3xl rounded-2xl border-zinc-800 bg-zinc-950">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">
  Add New Vehicle
</DialogTitle>
          </DialogHeader>

          <VehicleForm onSubmit={handleAddVehicle} />
        </DialogContent>
      </Dialog>
    </div>
  );
}