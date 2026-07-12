import {
  Bell,
  AlertTriangle,
  Truck,
  Fuel,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";

export default function Notifications() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Bell size={18} />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-80">
        <DropdownMenuItem>
          <AlertTriangle className="mr-2 h-4 w-4 text-red-400" />
          Vehicle WB12AB4589 needs service
        </DropdownMenuItem>

        <DropdownMenuItem>
          <Truck className="mr-2 h-4 w-4 text-blue-400" />
          Trip TRP-1023 started
        </DropdownMenuItem>

        <DropdownMenuItem>
          <Fuel className="mr-2 h-4 w-4 text-yellow-400" />
          Fuel stock updated
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}