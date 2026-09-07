import React, { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import api from "../services/api";

export default function Procurement() {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState("");

  const [form, setForm] = useState({
    memberId: "",
    commodity: "",
    quantityKg: "",
    grade: "A",
    pricePerKg: "",
    procurementDate: new Date()
        .toISOString()
        .slice(0, 10)
  });

  // Load procurements
  const load = async () => {
    try {
      const response = await api.get("/procurements");

      console.log(
          "PROCUREMENT API RESPONSE:",
          response.data
      );

      setData(response.data);
    } catch (error) {
      console.error(
          "Procurement loading error:",
          error
      );

      setData([]);
    }
  };

  // IMPORTANT:
  // Do not use useEffect(load, [])
  useEffect(() => {
    load();
  }, []);

  // Create procurement
  const submit = async (e) => {
    e.preventDefault();

    try {
      setMsg("");

      await api.post("/procurements", {
        ...form,
        memberId: Number(form.memberId),
        quantityKg: Number(form.quantityKg),
        pricePerKg: Number(form.pricePerKg)
      });

      setMsg(
          "Procurement created successfully."
      );

      setOpen(false);

      setForm({
        memberId: "",
        commodity: "",
        quantityKg: "",
        grade: "A",
        pricePerKg: "",
        procurementDate: new Date()
            .toISOString()
            .slice(0, 10)
      });

      await load();

    } catch (error) {
      console.error(
          "Procurement creation error:",
          error
      );

      setMsg(
          error.response?.data?.message ||
          "Unable to create procurement."
      );
    }
  };

  return (
      <>
        {/* Header */}
        <div className="page-head">

          <div>
          <span className="eyebrow">
            FARMER TRANSACTIONS
          </span>

            <h2>
              Procurement
            </h2>

            <p>
              Record and review produce procurement.
            </p>
          </div>

          <button
              className="primary"
              onClick={() => setOpen(true)}
          >
            <Plus size={17} />
            New procurement
          </button>

        </div>

        {/* Message */}
        {msg && (
            <div className="toast">
              {msg}
            </div>
        )}

        {/* Procurement Table */}
        <div className="panel">

          <table>

            <thead>
            <tr>
              <th>Member</th>
              <th>Commodity</th>
              <th>Quantity</th>
              <th>Grade</th>
              <th>Price/kg</th>
              <th>Total</th>
              <th>Payment</th>
            </tr>
            </thead>

            <tbody>

            {data.map((p) => (

                <tr key={p.id}>

                  <td>
                    {p.member?.name || "-"}
                  </td>

                  <td>
                    {p.commodity || "-"}
                  </td>

                  <td>
                    {p.quantityKg ?? 0} kg
                  </td>

                  <td>
                  <span className="grade">
                    {p.grade || "-"}
                  </span>
                  </td>

                  <td>
                    ₹{p.pricePerKg ?? 0}
                  </td>

                  <td>
                    <b>
                      ₹{p.totalAmount ?? 0}
                    </b>
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

          {data.length === 0 && (
              <div className="empty">
                No procurement records found.
              </div>
          )}

        </div>

        {/* Modal */}
        {open && (

            <div className="modal-bg">

              <form
                  className="modal"
                  onSubmit={submit}
              >

                <div className="modal-head">

                  <h3>
                    New Procurement
                  </h3>

                  <button
                      type="button"
                      onClick={() => setOpen(false)}
                  >
                    ×
                  </button>

                </div>

                <div className="form-grid">

                  <label>
                    Member ID

                    <input
                        type="number"
                        required
                        value={form.memberId}
                        onChange={(e) =>
                            setForm({
                              ...form,
                              memberId: e.target.value
                            })
                        }
                    />

                  </label>

                  <label>
                    Commodity

                    <input
                        type="text"
                        required
                        value={form.commodity}
                        onChange={(e) =>
                            setForm({
                              ...form,
                              commodity: e.target.value
                            })
                        }
                    />

                  </label>

                  <label>
                    Quantity (kg)

                    <input
                        type="number"
                        step="0.01"
                        required
                        value={form.quantityKg}
                        onChange={(e) =>
                            setForm({
                              ...form,
                              quantityKg: e.target.value
                            })
                        }
                    />

                  </label>

                  <label>
                    Grade

                    <select
                        value={form.grade}
                        onChange={(e) =>
                            setForm({
                              ...form,
                              grade: e.target.value
                            })
                        }
                    >
                      <option value="A">
                        A
                      </option>

                      <option value="B">
                        B
                      </option>

                      <option value="C">
                        C
                      </option>

                    </select>

                  </label>

                  <label>
                    Price per kg

                    <input
                        type="number"
                        step="0.01"
                        required
                        value={form.pricePerKg}
                        onChange={(e) =>
                            setForm({
                              ...form,
                              pricePerKg: e.target.value
                            })
                        }
                    />

                  </label>

                  <label>
                    Date

                    <input
                        type="date"
                        value={form.procurementDate}
                        onChange={(e) =>
                            setForm({
                              ...form,
                              procurementDate: e.target.value
                            })
                        }
                    />

                  </label>

                </div>

                <button
                    type="submit"
                    className="primary full"
                >
                  Create procurement
                </button>

              </form>

            </div>

        )}

      </>
  );
}