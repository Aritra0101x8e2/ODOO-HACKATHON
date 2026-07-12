import {
  Mail,
  Phone,
  Building2,
  Shield,
  Calendar,
  UserCircle2,
} from "lucide-react";
import type { ReactNode } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function Profile() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-white">
          Profile
        </h1>

        <p className="mt-2 text-zinc-400">
          Account information and organization details.
        </p>
      </div>

      <Card className="border-zinc-800 bg-zinc-900">
        <CardContent className="flex flex-col gap-6 p-8 md:flex-row md:items-center">
          <Avatar className="h-24 w-24">
            <AvatarFallback className="bg-blue-600 text-3xl font-bold text-white">
              AK
            </AvatarFallback>
          </Avatar>

          <div className="space-y-2">
            <h2 className="text-3xl font-bold text-white">
              Aritra Kundu
            </h2>

            <p className="text-zinc-400">
              Fleet Administrator
            </p>

            <div className="mt-4 flex flex-wrap gap-3">
              <span className="rounded-full bg-green-500/15 px-4 py-1 text-sm text-green-400">
                Active
              </span>

              <span className="rounded-full bg-blue-500/15 px-4 py-1 text-sm text-blue-400">
                Enterprise Plan
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="border-zinc-800 bg-zinc-900">
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
          </CardHeader>

          <CardContent className="space-y-5">
            <Info icon={<Mail size={18} />} label="Email" value="admin@transitops.com" />
            <Info icon={<Phone size={18} />} label="Phone" value="+91 9876543210" />
            <Info icon={<Building2 size={18} />} label="Organization" value="TransitOps Logistics" />
          </CardContent>
        </Card>

        <Card className="border-zinc-800 bg-zinc-900">
          <CardHeader>
            <CardTitle>Account Details</CardTitle>
          </CardHeader>

          <CardContent className="space-y-5">
            <Info icon={<Shield size={18} />} label="Role" value="Administrator" />
            <Info icon={<Calendar size={18} />} label="Member Since" value="January 2026" />
            <Info icon={<UserCircle2 size={18} />} label="Status" value="Verified" />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function Info({
  icon,
  label,
  value,
}: {
    icon: ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-4 rounded-lg border border-zinc-800 bg-zinc-950 p-4">
      <div className="text-blue-400">{icon}</div>

      <div>
        <div className="text-sm text-zinc-500">
          {label}
        </div>

        <div className="font-medium text-white">
          {value}
        </div>
      </div>
    </div>
  );
}