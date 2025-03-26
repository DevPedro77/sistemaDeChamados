import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../contexts/auth.app";

export default function Private({ children }) {
  const { signed, loading } = useContext(AuthContext);

  if (loading) {
    return <div>Carregando...</div>; // Pode ser um spinner ou algo visual
  }

  if (!signed) {
    return <Navigate to="/" />;
  }

  return children;
}
