import React, { useEffect, useState } from "react";
import { TrendingUp } from "lucide-react";
import api from "../services/api";

export default function Analytics() {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    api
        .get("/analytics/margin")
        .then((response) => {
          setData(response.data);
          setError("");
        })
        .catch(() => {
          setData(null);
          setError("Analytics data unavailable for this role.");
        });
  }, []);

  // Convert API field names into readable text
  const formatLabel = (key) => {
    return key
        .replace(/([A-Z])/g, " $1")
        .replace(/_/g, " ")
        .replace(/\s+/g, " ")
        .trim()
        .replace(/\b\w/g, (letter) => letter.toUpperCase());
  };

  return (
      <>
        <div className="page-head">
          <div>
            <span className="eyebrow">BUSINESS INSIGHTS</span>

            <h2>Analytics</h2>

            <p>
              Understand FPO procurement and sales performance.
            </p>
          </div>
        </div>

        {error && <div className="alert">{error}</div>}

        {data && (
            <div className="panel analytics-box">
              <div className="analytics-icon">
                <TrendingUp size={28} />
              </div>

              <h3>Margin overview</h3>

              <div className="json-grid">
                {Object.entries(data).map(([key, value]) => (
                    <div key={key}>
                      <span>{formatLabel(key)}</span>

                      <b>
                        {typeof value === "object"
                            ? JSON.stringify(value)
                            : String(value)}
                      </b>
                    </div>
                ))}
              </div>
            </div>
        )}
      </>
  );
}