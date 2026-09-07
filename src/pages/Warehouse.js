import React, { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import api from "../services/api";

export default function Warehouse() {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);

  const [form, setForm] = useState({
    location: "",
    capacityMt: "",
    currentStockMt: "",
    commodity: "",
    status: "ACTIVE"
  });

  // Load warehouses
  const load = async () => {
    try {
      const response = await api.get("/warehouse/stock");
      setData(response.data);
    } catch (error) {
      console.error("Warehouse loading error:", error);
    }
  };

  // IMPORTANT:
  // Do not use useEffect(load, [])
  // because load() returns a Promise.
  useEffect(() => {
    load();
  }, []);

  // Create warehouse
  const submit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/warehouse", {
        ...form,
        capacityMt: Number(form.capacityMt),
        currentStockMt: Number(form.currentStockMt)
      });

      setOpen(false);

      setForm({
        location: "",
        capacityMt: "",
        currentStockMt: "",
        commodity: "",
        status: "ACTIVE"
      });

      await load();

    } catch (error) {
      console.error("Warehouse creation error:", error);
    }
  };

  return (
      <>
        <div className="page-head">
          <div>
            <span className="eyebrow">INVENTORY</span>

            <h2>Warehouse</h2>

            <p>
              Monitor storage capacity and current stock.
            </p>
          </div>

          <button
              className="primary"
              onClick={() => setOpen(true)}
          >
            <Plus size={17} />
            Add warehouse
          </button>
        </div>

        <div className="warehouse-grid">
          {data.map((w) => {
            const pct = Math.min(
                100,
                (w.currentStockMt / w.capacityMt) * 100 || 0
            );

            return (
                <div
                    className="warehouse-card"
                    key={w.id}
                >
                  <div className="wh-top">
                    <div className="wh-icon">
                      🏭
                    </div>

                    <span className="badge success">
                  {w.status}
                </span>
                  </div>

                  <h3>
                    {w.location}
                  </h3>

                  <p>
                    {w.commodity}
                  </p>

                  <div className="progress">
                    <i
                        style={{
                          width: `${pct}%`
                        }}
                    />
                  </div>

                  <div className="wh-numbers">
                <span>
                  <b>{w.currentStockMt}</b> MT
                  <br />
                  <small>Current stock</small>
                </span>

                    <span>
                  <b>{w.capacityMt}</b> MT
                  <br />
                  <small>Capacity</small>
                </span>
                  </div>
                </div>
            );
          })}
        </div>

        {open && (
            <div className="modal-bg">
              <form
                  className="modal"
                  onSubmit={submit}
              >
                <div className="modal-head">
                  <h3>Add Warehouse</h3>

                  <button
                      type="button"
                      onClick={() => setOpen(false)}
                  >
                    ×
                  </button>
                </div>

                <div className="form-grid">

                  <label>
                    Location

                    <input
                        required
                        value={form.location}
                        onChange={(e) =>
                            setForm({
                              ...form,
                              location: e.target.value
                            })
                        }
                    />
                  </label>

                  <label>
                    Commodity

                    <input
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
                    Capacity (MT)

                    <input
                        type="number"
                        step="0.01"
                        required
                        value={form.capacityMt}
                        onChange={(e) =>
                            setForm({
                              ...form,
                              capacityMt: e.target.value
                            })
                        }
                    />
                  </label>

                  <label>
                    Current stock (MT)

                    <input
                        type="number"
                        step="0.01"
                        required
                        value={form.currentStockMt}
                        onChange={(e) =>
                            setForm({
                              ...form,
                              currentStockMt: e.target.value
                            })
                        }
                    />
                  </label>

                </div>

                <button
                    type="submit"
                    className="primary full"
                >
                  Create warehouse
                </button>

              </form>
            </div>
        )}
      </>
  );
}