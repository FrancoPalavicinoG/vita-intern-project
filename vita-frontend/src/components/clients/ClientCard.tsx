import { type Client } from "../../types/Client";

export default function ClientCard({ client }: { client: Client }) {
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
        </div>
    );
}