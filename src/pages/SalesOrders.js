import React, { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import api from "../services/api";

export default function SalesOrders() {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);

  const [form, setForm] = useState({
    buyerName: "",
    buyerType: "PRIVATE",
    commodity: "",
    quantityKg: "",
    agreedPricePerKg: "",
    saleDate: new Date()
        .toISOString()
        .slice(0, 10)
  });

  // Load sales orders
  const load = async () => {
    try {
      const response = await api.get(
          "/sales-orders"
      );

      console.log(
          "SALES ORDERS API RESPONSE:",
          response.data
      );

      setData(response.data);
    } catch (error) {
      console.error(
          "Sales orders loading error:",
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

  // Create sales order
  const submit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/sales-orders", {
        ...form,
        quantityKg: Number(form.quantityKg),
        agreedPricePerKg: Number(
            form.agreedPricePerKg
        )
      });

      setOpen(false);

      setForm({
        buyerName: "",
        buyerType: "PRIVATE",
        commodity: "",
        quantityKg: "",
        agreedPricePerKg: "",
        saleDate: new Date()
            .toISOString()
            .slice(0, 10)
      });

      await load();

    } catch (error) {
      console.error(
          "Sales order creation error:",
          error
      );
    }
  };

  // Mark payment received
  const pay = async (id) => {
    try {
      await api.put(
          `/sales-orders/${id}/payment?received=true`
      );

      await load();

    } catch (error) {
      console.error(
          "Payment update error:",
          error
      );
    }
  };

  return (
      <>
        {/* Header */}
        <div className="page-head">

          <div>
          <span className="eyebrow">
            MARKET SALES
          </span>

            <h2>
              Sales Orders
            </h2>

            <p>
              Manage buyer orders and payment status.
            </p>
          </div>

          <button
              className="primary"
              onClick={() => setOpen(true)}
          >
            <Plus size={17} />
            New sale
          </button>

        </div>

        {/* Table */}
        <div className="panel">

          <table>

            <thead>
            <tr>
              <th>Buyer</th>
              <th>Type</th>
              <th>Commodity</th>
              <th>Quantity</th>
              <th>Price/kg</th>
              <th>Date</th>
              <th>Payment</th>
            </tr>
            </thead>

            <tbody>

            {data.map((s) => (

                <tr key={s.id}>

                  <td>
                    <b>
                      {s.buyerName || "-"}
                    </b>
                  </td>

                  <td>
                    {s.buyerType || "-"}
                  </td>

                  <td>
                    {s.commodity || "-"}
                  </td>

                  <td>
                    {s.quantityKg ?? 0} kg
                  </td>

                  <td>
                    ₹{s.agreedPricePerKg ?? 0}
                  </td>

                  <td>
                    {s.saleDate || "-"}
                  </td>

                  <td>

                    {s.paymentReceived ? (

                        <span className="badge success">
                      RECEIVED
                    </span>

                    ) : (

                        <button
                            className="small-btn"
                            onClick={() => pay(s.id)}
                        >
                          Mark received
                        </button>

                    )}

                  </td>

                </tr>

            ))}

            </tbody>

          </table>

          {data.length === 0 && (
              <div className="empty">
                No sales orders found.
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
                    New Sales Order
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
                    Buyer name

                    <input
                        type="text"
                        required
                        value={form.buyerName}
                        onChange={(e) =>
                            setForm({
                              ...form,
                              buyerName: e.target.value
                            })
                        }
                    />

                  </label>

                  <label>
                    Buyer type

                    <select
                        value={form.buyerType}
                        onChange={(e) =>
                            setForm({
                              ...form,
                              buyerType: e.target.value
                            })
                        }
                    >

                      <option value="PRIVATE">
                        PRIVATE
                      </option>

                      <option value="GOVERNMENT">
                        GOVERNMENT
                      </option>

                      <option value="FPO">
                        FPO
                      </option>

                    </select>

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
                    Price per kg

                    <input
                        type="number"
                        step="0.01"
                        required
                        value={form.agreedPricePerKg}
                        onChange={(e) =>
                            setForm({
                              ...form,
                              agreedPricePerKg:
                              e.target.value
                            })
                        }
                    />

                  </label>

                  <label>
                    Date

                    <input
                        type="date"
                        value={form.saleDate}
                        onChange={(e) =>
                            setForm({
                              ...form,
                              saleDate: e.target.value
                            })
                        }
                    />

                  </label>

                </div>

                <button
                    type="submit"
                    className="primary full"
                >
                  Create sales order
                </button>

              </form>

            </div>

        )}

      </>
  );
}