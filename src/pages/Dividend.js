import React, { useState } from "react";
import api from "../services/api";

export default function Dividend() {
  const [form, setForm] = useState({
    memberId: "",
    ratePercent: ""
  });

  const [data, setData] = useState(null);
  const [err, setErr] = useState("");

  const submit = async (e) => {
    e.preventDefault();

    if (!form.memberId.trim()) {
      setErr("Please enter Member ID.");
      setData(null);
      return;
    }

    if (!form.ratePercent.trim()) {
      setErr("Please enter dividend rate.");
      setData(null);
      return;
    }

    try {
      setErr("");

      const response = await api.post(
          "/dividends/calculate",
          {
            memberId: Number(form.memberId),
            ratePercent: Number(form.ratePercent)
          }
      );

      console.log(
          "DIVIDEND API RESPONSE:",
          response.data
      );

      setData(response.data);

    } catch (error) {
      console.error(
          "Dividend error:",
          error
      );

      setData(null);

      setErr(
          error.response?.data?.message ||
          "Calculation failed."
      );
    }
  };

  return (
      <>
        <div className="page-head">

          <div>
          <span className="eyebrow">
            MEMBER RETURNS
          </span>

            <h2>
              Dividend Calculator
            </h2>

            <p>
              Calculate a proposed dividend from share capital.
            </p>
          </div>

        </div>

        <form
            className="inline-form"
            onSubmit={submit}
        >

          <input
              type="text"
              value={form.memberId}
              onChange={(e) =>
                  setForm({
                    ...form,
                    memberId: e.target.value
                  })
              }
              placeholder="Member ID"
          />

          <input
              type="number"
              step="0.01"
              value={form.ratePercent}
              onChange={(e) =>
                  setForm({
                    ...form,
                    ratePercent: e.target.value
                  })
              }
              placeholder="Rate %"
          />

          <button
              type="submit"
              className="primary"
          >
            Calculate
          </button>

        </form>

        {err && (
            <div className="alert">
              {err}
            </div>
        )}

        {data && (
            <div className="dividend-result">

          <span>
            CALCULATED DIVIDEND
          </span>

              <strong>
                ₹{data.calculatedDividend ?? 0}
              </strong>

              <div>

                <b>
                  {data.memberId || "-"}
                </b>

                <small>
                  Share capital ₹
                  {data.shareCapital ?? 0}
                  {" • "}
                  Rate {data.ratePercent ?? 0}%
                </small>

              </div>

              <span className="badge warning">
            Approval required
          </span>

            </div>
        )}

      </>
  );
}