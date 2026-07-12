import { Pencil, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";

interface VehicleActionsProps {
  onEdit: () => void;
  onDelete: () => void;
}

export default function VehicleActions({
  onEdit,
  onDelete,
}: VehicleActionsProps) {
  return (
    <div className="flex items-center gap-2">
      <Button
        size="icon"
        variant="outline"
        onClick={onEdit}
      >
        <Pencil className="h-4 w-4" />
      </Button>

      <Button
        size="icon"
        variant="destructive"
        onClick={onDelete}
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
}