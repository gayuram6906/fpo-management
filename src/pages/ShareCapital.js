import React, { useState } from "react";
import api from "../services/api";

export default function ShareCapital() {
  const [id, setId] = useState("");
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  const checkBalance = async (e) => {
    e.preventDefault();

    if (!id.trim()) {
      setError("Please enter a Member ID.");
      setData(null);
      return;
    }

    try {
      setError("");

      const response = await api.get(`/members/${id.trim()}`);

      setData(response.data);
    } catch (err) {
      console.error("Share capital error:", err);

      setData(null);

      setError(
          err.response?.data?.message ||
          "Unable to load share capital."
      );
    }
  };

  return (
      <div className="share-capital-page">

        <div className="page-head">
          <div>
          <span className="eyebrow">
            COOPERATIVE EQUITY
          </span>

            <h2>
              Share Capital
            </h2>

            <p>
              Check a member's share capital balance.
            </p>
          </div>
        </div>

        <form
            className="share-capital-form"
            onSubmit={checkBalance}
        >
          <input
              className="share-capital-input"
              type="text"
              value={id}
              onChange={(e) => setId(e.target.value)}
              placeholder="Enter Member ID (e.g. 3)"
          />

          <button
              type="submit"
              className="share-capital-button"
          >
            Check balance
          </button>
        </form>

        {error && (
            <div className="share-capital-error">
              {error}
            </div>
        )}

        {data && (
            <div className="capital-card">

              <div className="capital-icon">
                ₹
              </div>

              <div className="capital-details">

            <span className="capital-member-id">
              {data.memberId || `Member ID: ${id}`}
            </span>

                <h3 className="capital-member-name">
                  {data.name || data.member?.name || "-"}
                </h3>

                <span className="capital-label">
              Current share capital
            </span>

              </div>

              <strong className="capital-amount">
                ₹{data.shareCapital || 0}
              </strong>

            </div>
        )}

      </div>
  );
}