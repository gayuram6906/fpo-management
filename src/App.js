import React from "react";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes
} from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Members from "./pages/Members";
import Procurement from "./pages/Procurement";
import Passbook from "./pages/Passbook";
import ShareCapital from "./pages/ShareCapital";
import SalesOrders from "./pages/SalesOrders";
import Warehouse from "./pages/Warehouse";
import Analytics from "./pages/Analytics";
import Notifications from "./pages/Notifications";
import NabardReport from "./pages/NabardReport";
import Dividend from "./pages/Dividend";
import Profile from "./pages/Profile";

import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {

  return (

      <BrowserRouter>

        <Routes>

          {/* LOGIN */}
          <Route
              path="/login"
              element={<Login />}
          />


          {/* PROTECTED ROUTES */}
          <Route element={<ProtectedRoute />}>

            <Route element={<Layout />}>

              {/* DASHBOARD */}
              <Route
                  path="/dashboard"
                  element={<Dashboard />}
              />

              {/* MEMBERS */}
              <Route
                  path="/members"
                  element={<Members />}
              />

              {/* PROCUREMENT */}
              <Route
                  path="/procurement"
                  element={<Procurement />}
              />

              {/* PASSBOOK */}
              <Route
                  path="/passbook"
                  element={<Passbook />}
              />

              {/* SHARE CAPITAL */}
              <Route
                  path="/share-capital"
                  element={<ShareCapital />}
              />

              {/* SALES ORDERS */}
              <Route
                  path="/sales"
                  element={<SalesOrders />}
              />

              {/* WAREHOUSE */}
              <Route
                  path="/warehouse"
                  element={<Warehouse />}
              />

              {/* ANALYTICS */}
              <Route
                  path="/analytics"
                  element={<Analytics />}
              />

              {/* NOTIFICATIONS */}
              <Route
                  path="/notifications"
                  element={<Notifications />}
              />

              {/* NABARD REPORT */}
              <Route
                  path="/reports"
                  element={<NabardReport />}
              />

              {/* DIVIDEND */}
              <Route
                  path="/dividend"
                  element={<Dividend />}
              />

              {/* PROFILE */}
              <Route
                  path="/profile"
                  element={<Profile />}
              />

            </Route>

          </Route>


          {/* DEFAULT */}
          <Route
              path="/"
              element={
                <Navigate
                    to="/dashboard"
                    replace
                />
              }
          />


          {/* INVALID URL */}
          <Route
              path="*"
              element={
                <Navigate
                    to="/dashboard"
                    replace
                />
              }
          />

        </Routes>

      </BrowserRouter>
  );
}