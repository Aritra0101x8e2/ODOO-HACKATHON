import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";

import DashboardLayout from "../layouts/DashboardLayout";

import Login from "../pages/auth/Login";
import Dashboard from "../pages/dashboard/Dashboard";
import VehicleList from "../pages/vehicles/VehicleList";
import DriverList from "../pages/drivers/DriverList";
import TripList from "../pages/trips/TripList";
import MaintenanceList from "../pages/maintenance/MaintenanceList";
import FuelLogs from "../pages/fuel/FuelLogs";
import Reports from "../pages/reports/Reports";
import Profile from "../pages/profile/Profile";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public Routes */}

        <Route
          path="/login"
          element={<Login />}
        />

        {/* Protected Routes */}

        <Route
          path="/app"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route
            index
            element={<Navigate to="dashboard" replace />}
          />

          <Route
            path="dashboard"
            element={<Dashboard />}
          />

          <Route
            path="vehicles"
            element={<VehicleList />}
          />

          <Route
            path="drivers"
            element={<DriverList />}
          />

          <Route
            path="trips"
            element={<TripList />}
          />

          <Route
            path="maintenance"
            element={<MaintenanceList />}
          />

          <Route
            path="fuel"
            element={<FuelLogs />}
          />

          <Route
            path="reports"
            element={<Reports />}
          />

          <Route
            path="profile"
            element={<Profile />}
          />
        </Route>

        {/* Redirect */}

        <Route
          path="*"
          element={<Navigate to="/app" replace />}
        />

      </Routes>
    </BrowserRouter>
  );
}