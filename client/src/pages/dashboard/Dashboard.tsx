import PageHeader from "../../components/common/PageHeader/PageHeader";

import FleetOverview from "../../components/dashboard/FleetOverview/FleetOverview";
import VehicleStatusChart from "../../components/dashboard/VehicleStatusChart/VehicleStatusChart";
import TripsChart from "../../components/dashboard/TripsChart/TripsChart";

import RecentTripsTable from "../../components/dashboard/RecentTripsTable";
import MaintenanceAlerts from "../../components/dashboard/MaintenanceAlerts";
import QuickActions from "../../components/dashboard/QuickActions";

export default function Dashboard() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Fleet Dashboard"
        subtitle="Real-time overview of fleet operations"
      />

      <FleetOverview />

      <div className="grid gap-6 xl:grid-cols-2">
        <VehicleStatusChart />

        <TripsChart />
      </div>

      <MaintenanceAlerts />

      <RecentTripsTable />

      <QuickActions />
    </div>
  );
}