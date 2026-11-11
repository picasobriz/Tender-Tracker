import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// Unauthenticated users go to /login; wrong-role users go back to their dashboard.
export default function ProtectedRoute({ roles, children }) {
  const { user, loading } = useAuth();
  if (loading) return <p>Loading...</p>;
  if (!user) return <Navigate to="/login" replace />;
  if (roles && !roles.includes(user.role)) return <Navigate to="/dashboard" replace />;
  return children;
}
