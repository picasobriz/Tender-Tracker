import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  return (
    <nav style={{ display: "flex", gap: 16, padding: 12, borderBottom: "1px solid #ddd" }}>
      <strong>TenderTrack</strong>
      {user ? (
        <>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/tenders">Tenders</Link>
          <span style={{ marginLeft: "auto" }}>{user.name} ({user.role})</span>
          <button onClick={logout}>Log out</button>
        </>
      ) : (
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </>
      )}
    </nav>
  );
}
