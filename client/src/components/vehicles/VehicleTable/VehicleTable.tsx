import DataTable from "../../common/DataTable/DataTable";
import StatusBadge from "../../common/StatusBadge/StatusBadge";
import VehicleEmptyState from "./VehicleEmptyState";
import VehicleActions from "../VehicleActions/VehicleActions";

import type { Vehicle } from "../../../types/vehicle";

interface Props {
  vehicles: Vehicle[];
  onEdit: (vehicle: Vehicle) => void;
  onDelete: (vehicle: Vehicle) => void;
}

export default function VehicleTable({
  vehicles,
  onEdit,
  onDelete,
}: Props) {
  if (vehicles.length === 0) {
    return <VehicleEmptyState />;
  }

  return (
    <DataTable
      data={vehicles}
      columns={[
        {
          key: "registrationNumber",
          title: "Registration",
        },
        {
          key: "vehicleName",
          title: "Vehicle",
        },
        {
          key: "type",
          title: "Type",
        },
        {
          key: "maxLoadCapacity",
          title: "Capacity",
          render: (value) => `${value} Kg`,
        },
        {
          key: "odometer",
          title: "Odometer",
          render: (value) => `${value} KM`,
        },
        {
          key: "acquisitionCost",
          title: "Cost",
          render: (value) =>
            `₹${Number(value).toLocaleString()}`,
        },
        {
          key: "status",
          title: "Status",
          render: (value) => (
            <StatusBadge status={String(value)} />
          ),
        },
        {
          key: "id",
          title: "Actions",
          render: (_, row) => (
            <VehicleActions
              onEdit={() => onEdit(row)}
              onDelete={() => onDelete(row)}
            />
          ),
        },
      ]}
    />
  );
}