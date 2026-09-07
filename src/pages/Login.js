import React, { useState } from "react";
import { Leaf, Lock, Mail, ShieldCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function Login() {
  const [form, setForm] = useState({identifier:"", password:""});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const {data} = await api.post("/auth/login", form);
      localStorage.setItem("token", data.token);
      Object.entries(data).forEach(([key, value]) => {
        if (key !== "token" && value !== undefined && value !== null) {
          localStorage.setItem(key, String(value));
        }
      });
      navigate("/dashboard");
    } catch (e) {
      setError(e.response?.data?.message || "Login failed. Check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-visual">
        <div className="login-brand">
          <div className="brand-mark large"><Leaf size={38}/></div>
          <span>FPO Management</span>
        </div>

        <div className="hero-copy">
          <span className="pill">SMART • CONNECTED • FARMER FIRST</span>
          <h1>Grow together.<br/><em>Prosper together.</em></h1>
          <p>
            A modern management platform for farmer producer organisations,
            procurement, sales and cooperative operations.
          </p>
        </div>

        <div className="login-stats">
          <div><b>🌾</b><span>Farmer Members</span></div>
          <div><b>📦</b><span>Procurement</span></div>
          <div><b>📈</b><span>Performance</span></div>
        </div>
      </div>

      <div className="login-panel">
        <form className="login-card" onSubmit={submit}>
          <div className="mobile-brand"><Leaf size={28}/></div>
          <h2>Welcome back</h2>
          <p>Sign in to your FPO workspace</p>

          {error && <div className="alert">{error}</div>}

          <label>Email</label>
          <div className="field">
            <Mail size={18}/>
            <input
              value={form.identifier}
              onChange={e=>setForm({...form,identifier:e.target.value})}
              placeholder="sam@gmail.com"
              required
            />
          </div>

          <label>Password</label>
          <div className="field">
            <Lock size={18}/>
            <input
              type="password"
              value={form.password}
              onChange={e=>setForm({...form,password:e.target.value})}
              placeholder="••••••••"
              required
            />
          </div>

          <button className="primary full" disabled={loading}>
            {loading ? "Signing in..." : "Sign in"}
          </button>

          <div className="secure">
            <ShieldCheck size={16}/> Secured with JWT authentication
          </div>
        </form>
      </div>
    </div>
  );
}