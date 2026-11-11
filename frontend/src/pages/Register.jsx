import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api";

// Step 1: register. Step 2: paste the token that was emailed to you.
export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "contractor" });
  const [step, setStep] = useState(1);
  const [token, setToken] = useState("");
  const [error, setError] = useState("");

  const call = (path, body, next) => async (e) => {
    e.preventDefault();
    try {
      await api(path, { method: "POST", body });
      setError("");
      next();
    } catch (err) {
      setError(err.message);
    }
  };
  const set = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  return step === 1 ? (
    <form onSubmit={call("/auth/register", form, () => setStep(2))} style={{ display: "grid", gap: 8, maxWidth: 320 }}>
      <h2>Create account</h2>
      {error && <p style={{ color: "crimson" }}>{error}</p>}
      <input placeholder="Company / name" required value={form.name} onChange={set("name")} />
      <input type="email" placeholder="Email" required value={form.email} onChange={set("email")} />
      <input type="password" placeholder="Password (8+ characters)" required value={form.password} onChange={set("password")} />
      <select value={form.role} onChange={set("role")}>
        <option value="contractor">Contractor / Bidder</option>
        <option value="auditor">Auditor / Viewer</option>
      </select>
      <button>Register</button>
    </form>
  ) : (
    <form onSubmit={call("/auth/verify", { token }, () => navigate("/login"))} style={{ display: "grid", gap: 8, maxWidth: 320 }}>
      <h2>Check your email</h2>
      <p>Paste the verification token we sent to {form.email}.</p>
      {error && <p style={{ color: "crimson" }}>{error}</p>}
      <input placeholder="Verification token" required value={token} onChange={(e) => setToken(e.target.value)} />
      <button>Verify</button>
    </form>
  );
}
