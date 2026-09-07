import React, { useEffect, useState } from "react";
import {
  ArrowUpRight,
  Boxes,
  PackageCheck,
  Users,
  Warehouse
} from "lucide-react";
import { Link } from "react-router-dom";

import api from "../services/api";
import StatCard from "../components/StatCard";

export default function Dashboard() {

  const [summary, setSummary] = useState({
    memberCount: 0,
    procurementCount: 0,
    salesOrderCount: 0,
    warehouseCount: 0,
    procurementValue: 0
  });

  const [procurements, setProcurements] = useState([]);
  const [error, setError] = useState("");

  const name = localStorage.getItem("name") || "User";

  useEffect(() => {

    const loadDashboard = async () => {

      try {
        const response = await api.get("/reports/nabard");

        console.log("NABARD API RESPONSE:", response.data);

        setSummary(response.data);
        setError("");

      } catch (err) {

        console.error("NABARD API ERROR:", err);

        setError(
            "Unable to load dashboard summary. Please login again."
        );

      }

      try {

        const response = await api.get("/procurements");

        console.log("PROCUREMENT API RESPONSE:", response.data);

        setProcurements(response.data);

      } catch (err) {

        console.error("PROCUREMENT API ERROR:", err);

      }
    };

    loadDashboard();

  }, []);

  return (
      <>
        <div className="page-head">
          <div>
            <span className="eyebrow">OVERVIEW</span>

            <h2>
              Good to see you, {name} 👋
            </h2>

            <p>
              Here's a quick view of your FPO operations.
            </p>
          </div>
        </div>

        {error && (
            <div className="alert">
              {error}
            </div>
        )}

        <div className="stats-grid">

          <StatCard
              icon={Users}
              label="Members"
              value={summary.memberCount}
          />

          <StatCard
              icon={PackageCheck}
              label="Procurements"
              value={summary.procurementCount}
          />

          <StatCard
              icon={Boxes}
              label="Sales Orders"
              value={summary.salesOrderCount}
          />

          <StatCard
              icon={Warehouse}
              label="Warehouses"
              value={summary.warehouseCount}
          />

        </div>

        <div className="two-col">

          <div className="panel">

            <div className="panel-head">

              <div>
                <h3>Recent Procurement</h3>
                <p>Latest farmer transactions</p>
              </div>

              <Link to="/procurement">
                View all
                <ArrowUpRight size={15} />
              </Link>

            </div>

            {procurements.length > 0 ? (

                <div className="table-wrap">

                  <table>

                    <thead>
                    <tr>
                      <th>Member</th>
                      <th>Commodity</th>
                      <th>Quantity</th>
                      <th>Total</th>
                      <th>Status</th>
                    </tr>
                    </thead>

                    <tbody>

                    {procurements.slice(0, 6).map((p) => (

                        <tr key={p.id}>

                          <td>
                            {p.member?.name || "-"}
                          </td>

                          <td>
                            {p.commodity}
                          </td>

                          <td>
                            {p.quantityKg} kg
                          </td>

                          <td>
                            ₹{p.totalAmount}
                          </td>

                          <td>
                        <span className="badge pending">
                          {p.paymentStatus}
                        </span>
                          </td>

                        </tr>

                    ))}

                    </tbody>

                  </table>

                </div>

            ) : (

                <div className="empty">
                  No procurement records found.
                </div>

            )}

          </div>

          <div className="panel insight">

          <span className="insight-icon">
            🌱
          </span>

            <h3>FPO at a glance</h3>

            <p>
              Keep farmer records, procurement,
              sales and warehouse operations
              connected in one place.
            </p>

            <p>
              <strong>
                Procurement Value: ₹{summary.procurementValue}
              </strong>
            </p>

            <Link
                className="text-link"
                to="/analytics"
            >
              Open analytics →
            </Link>

          </div>

        </div>
      </>
  );
}