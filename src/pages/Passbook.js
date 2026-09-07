import React, { useState } from "react";
import api from "../services/api";

export default function Passbook() {
  const [id, setId] = useState("");
  const [data, setData] = useState(null);
  const [err, setErr] = useState("");

  const load = async (e) => {
    e.preventDefault();

    if (!id.trim()) {
      setErr("Please enter a Member ID.");
      setData(null);
      return;
    }

    try {
      setErr("");
      setData(null);

      const response = await api.get(
          `/members/${id.trim()}/passbook`
      );

      console.log("PASSBOOK API RESPONSE:", response.data);

      setData(response.data);
    } catch (error) {
      console.error("Passbook error:", error);

      setData(null);

      setErr(
          error.response?.data?.message ||
          "Passbook not found."
      );
    }
  };

  return (
      <>
        {/* Page Header */}
        <div className="page-head">
          <div>
          <span className="eyebrow">
            MEMBER LEDGER
          </span>

            <h2>Passbook</h2>

            <p>
              View a member's share capital and transaction history.
            </p>
          </div>
        </div>

        {/* Search Form */}
        <form
            className="inline-form"
            onSubmit={load}
        >
          <input
              type="text"
              value={id}
              onChange={(e) => setId(e.target.value)}
              placeholder="Enter Member ID (e.g. 3)"
          />

          <button
              type="submit"
              className="primary"
          >
            View passbook
          </button>
        </form>

        {/* Error */}
        {err && (
            <div className="alert">
              {err}
            </div>
        )}

        {/* Passbook */}
        {data && (
            <div className="passbook">

              {/* Member Information */}
              <div className="panel pass-head">

                <div>
                  <span>MEMBER</span>

                  <h3>
                    {data.member?.name || "-"}
                  </h3>

                  <small>
                    {data.member?.memberId || "-"}
                    {" • "}
                    {data.member?.village || "-"}
                  </small>
                </div>

                <div className="amount">

              <span>
                Share Capital
              </span>

                  <b>
                    ₹{data.shareCapital ?? 0}
                  </b>

                </div>

              </div>

              {/* Statistics */}
              <div className="stats-grid mini">

                <div className="stat-card">

                  <div>
                <span>
                  Transactions
                </span>

                    <strong>
                      {data.procurementCount ?? 0}
                    </strong>
                  </div>

                </div>

                <div className="stat-card">

                  <div>
                <span>
                  Total Procurement
                </span>

                    <strong>
                      ₹{data.totalProcurementValue ?? 0}
                    </strong>
                  </div>

                </div>

              </div>

              {/* Transactions */}
              <div className="panel">

                <h3>
                  Transactions
                </h3>

                {data.transactions &&
                data.transactions.length > 0 ? (

                    <table>

                      <thead>
                      <tr>
                        <th>Date</th>
                        <th>Commodity</th>
                        <th>Quantity</th>
                        <th>Total</th>
                        <th>Payment</th>
                      </tr>
                      </thead>

                      <tbody>

                      {data.transactions.map((p) => (

                          <tr key={p.id}>

                            <td>
                              {p.procurementDate || "-"}
                            </td>

                            <td>
                              {p.commodity || "-"}
                            </td>

                            <td>
                              {p.quantityKg ?? 0} kg
                            </td>

                            <td>
                              ₹{p.totalAmount ?? 0}
                            </td>

                            <td>
                        <span className="badge pending">
                          {p.paymentStatus || "-"}
                        </span>
                            </td>

                          </tr>

                      ))}

                      </tbody>

                    </table>

                ) : (

                    <div className="empty">
                      No transactions found for this member.
                    </div>

                )}

              </div>

            </div>
        )}
      </>
  );
}