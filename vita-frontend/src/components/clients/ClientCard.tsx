import { type Client } from "../../types/Client";
import { useRegisterSession } from "../../hooks/useRegisterSession";

export default function ClientCard({ client }: { client: Client }) {
  const { loading, error, success, registerSession } = useRegisterSession();
  
  return (
      <div style={{ 
        border: "1px solid #ddd",
        padding: "12px",
        marginBottom: "10px",
        borderRadius: "8px" 
      }}>
        <h3>{client.name}</h3>
        <p>Email: {client.email || "N/A"}</p>
        <p>Teléfono: {client.phone || "N/A"}</p>
  
        <p>
          <strong>{client.planName}</strong> — {client.usedSessions} /{" "}
          {client.totalSessions} sesiones
        </p>
        <button
        onClick={() => registerSession(client.id)}
        disabled={loading}
        style={{ padding: "6px 12px", marginTop: "8px" }}
        >
          {loading ? "Registrando..." : "Registrar sesión hoy"}
        </button>

        {error && <p style={{ color: "red" }}>{error}</p>}
        {success && <p style={{ color: "green" }}>{success}</p>}
      </div>
  );
}