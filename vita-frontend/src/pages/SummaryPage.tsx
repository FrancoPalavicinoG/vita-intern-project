import { useSummary } from "../hooks/useSummary";

export default function SummaryPage() {
  const today = new Date().toISOString().split("T")[0];
  const { summary, loading, error } = useSummary(today);

  if (loading) return <p>Cargando resumen...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!summary) return null;

  return (
    <div style={{ padding: 20 }}>
      <h1>Resumen del día ({summary.date})</h1>

      <h2>Citas realizadas hoy</h2>
      <p style={{ fontSize: "18px", fontWeight: "bold" }}>
        {summary.totalAppointments}
      </p>

      <h2>Clientes únicos atendidos hoy</h2>
      <p style={{ fontSize: "18px" }}>
        {summary.uniqueClients}
      </p>

      <h2>Clientes que quedaron sin sesiones</h2>
      {summary.clientsWithZeroSessions.length === 0 ? (
        <p>Ningún cliente quedó sin sesiones 🎉</p>
      ) : (
        summary.clientsWithZeroSessions.map((client) => (
          <div
            key={client.id}
            style={{
              border: "1px solid #ddd",
              padding: "10px",
              borderRadius: "8px",
              marginBottom: "10px"
            }}
          >
            <p><strong>{client.name}</strong></p>
            <p>Email: {client.email}</p>
            <p>Tel: {client.phone}</p>

            <a
              href={`https://wa.me/${client.phone?.replace("+", "")}`}
              target="_blank"
              rel="noreferrer"
            >
              <button style={{ marginTop: "8px" }}>
                Contactar por WhatsApp
              </button>
            </a>
          </div>
        ))
      )}

      <h2>Detalle de citas del día</h2>
      {summary.appointments.map((appt) => (
        <div
          key={appt.id}
          style={{
            border: "1px solid #ccc",
            padding: "10px",
            marginBottom: "10px",
            borderRadius: "8px"
          }}
        >
          <p><strong>{appt.name}</strong></p>
          <p>Plan: {appt.planName}</p>
          <p>
            Hora: {new Date(appt.date).toLocaleTimeString("es-CL", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>
      ))}
    </div>
  );
}