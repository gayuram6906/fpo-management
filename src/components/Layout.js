import React from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";

import {
  BarChart3,
  Bell,
  Boxes,
  CircleDollarSign,
  FileText,
  Home,
  Leaf,
  LogOut,
  PackageCheck,
  ReceiptText,
  Sprout,
  UserRound,
  Users
} from "lucide-react";

const links = [
  ["Dashboard", "/dashboard", Home],
  ["Members", "/members", Users],
  ["Procurement", "/procurement", PackageCheck],
  ["Passbook", "/passbook", ReceiptText],
  ["Share Capital", "/share-capital", CircleDollarSign],
  ["Sales Orders", "/sales", Boxes],
  ["Warehouse", "/warehouse", Sprout],
  ["Analytics", "/analytics", BarChart3],
  ["Notifications", "/notifications", Bell],
  ["NABARD Report", "/reports", FileText],
  ["Dividend", "/dividend", CircleDollarSign],
  ["Profile", "/profile", UserRound]
];

export default function Layout() {

  const navigate = useNavigate();

  const name = localStorage.getItem("name") || "User";
  const role = localStorage.getItem("role") || "";

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
      <div className="app-shell">

        {/* SIDEBAR */}
        <aside className="sidebar">

          {/* BRAND */}
          <div className="brand">

            <div className="brand-mark">
              <Leaf size={24} />
            </div>

            <div>
              <strong>FPO</strong>
              <span>Management</span>
            </div>

          </div>

          {/* NAVIGATION */}
          <nav>

            {links.map(([label, path, Icon]) => (

                <NavLink
                    key={path}
                    to={path}
                    className={({ isActive }) =>
                        isActive
                            ? "nav-link active"
                            : "nav-link"
                    }
                >

                  <Icon size={18} />

                  <span>
                {label}
              </span>

                </NavLink>

            ))}

          </nav>

          {/* LOGOUT */}
          <button
              className="logout"
              onClick={logout}
          >

            <LogOut size={18} />

            <span>
            Logout
          </span>

          </button>

        </aside>


        {/* MAIN AREA */}
        <main className="main-area">

          {/* TOP BAR */}
          <header className="topbar">

            <div>

            <span className="eyebrow">
              AGRICULTURAL COOPERATIVE
            </span>

              <h1>
                Farmer Producer Organisation
              </h1>

            </div>


            {/* USER */}
            <div className="user-chip">

              <div className="avatar">
                {name.charAt(0).toUpperCase()}
              </div>

              <div>

                <b>
                  {name}
                </b>

                <small>
                  {role
                      ? role.replaceAll("_", " ")
                      : "User"}
                </small>

              </div>

            </div>

          </header>


          {/* PAGE CONTENT */}
          <section className="content">

            <Outlet />

          </section>

        </main>

      </div>
  );
}