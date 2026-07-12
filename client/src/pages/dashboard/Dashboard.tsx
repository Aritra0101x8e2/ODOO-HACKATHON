import PageHeader from "../../components/common/PageHeader/PageHeader";

import KpiGrid from "../../components/dashboard/KpiGrid";

import FleetUtilizationChart from "../../components/dashboard/FleetUtilizationChart";

import RecentTripsTable from "../../components/dashboard/RecentTripsTable";

import MaintenanceAlerts from "../../components/dashboard/MaintenanceAlerts";

import QuickActions from "../../components/dashboard/QuickActions";


export default function Dashboard(){

return(

<div className="space-y-8">


<PageHeader

title="Fleet Dashboard"

subtitle="Real-time overview of fleet operations"

/>


<KpiGrid/>


<div className="grid gap-6 xl:grid-cols-2">


<FleetUtilizationChart/>


<MaintenanceAlerts/>


</div>


<RecentTripsTable/>


<QuickActions/>


</div>

);

}