import { useSummary } from "../hooks/useSummary";

export default function SummaryPage() {
  const today = new Date().toISOString().split("T")[0];
  const { summary, loading, error } = useSummary(today);

  if (loading)
    return <p className="text-center text-gray-600 text-lg mt-10">Cargando resumen...</p>;

  if (error)
    return <p className="text-center text-red-500 text-lg mt-10">{error}</p>;

  if (!summary) return null;

  return (
    <div className="px-6 py-4">
    <h1 className="text-3xl font-bold text-gray-800 mb-4">
        Resumen del día{' '}
        {new Date(summary.date).toLocaleDateString('es-ES', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        })}
    </h1>

      {/* Resumen general */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white shadow-sm border border-gray-200 p-4 rounded-lg">
          <h2 className="text-lg font-semibold text-gray-700">Citas realizadas</h2>
          <p className="text-3xl font-bold text-blue-600 mt-2">
            {summary.totalAppointments}
          </p>
        </div>

        <div className="bg-white shadow-sm border border-gray-200 p-4 rounded-lg">
          <h2 className="text-lg font-semibold text-gray-700">Clientes únicos</h2>
          <p className="text-3xl font-bold text-green-600 mt-2">
            {summary.uniqueClients}
          </p>
        </div>

        <div className="bg-white shadow-sm border border-gray-200 p-4 rounded-lg">
          <h2 className="text-lg font-semibold text-gray-700">Sesiones usadas</h2>
          <p className="text-3xl font-bold text-purple-600 mt-2">
            {summary.sessionUsed}
          </p>
        </div>
      </div>

      {/* Clientes sin sesiones */}
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Clientes sin sesiones restantes
      </h2>

      {summary.clientsWithZeroSessions.length === 0 ? (
        <p className="text-gray-600 mb-6">Ningún cliente quedó sin sesiones 🎉</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {summary.clientsWithZeroSessions.map((client) => (
            <div
              key={client.id}
              className="bg-white shadow-sm border border-gray-200 p-4 rounded-lg"
            >
              <p className="text-lg font-semibold">{client.name}</p>
              <p className="text-gray-600">Email: {client.email || "N/A"}</p>
              <p className="text-gray-600">Tel: {client.phone || "N/A"}</p>

              <a
                href={`https://wa.me/${client.phone?.replace("+", "")}`}
                target="_blank"
                rel="noreferrer"
              >
                <button className="mt-3 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition">
                  Contactar por WhatsApp
                </button>
              </a>
            </div>
          ))}
        </div>
      )}

      {/* Detalle de citas */}
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Detalle de citas del día</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {summary.appointments.map((appt) => (
          <div
            key={appt.id}
            className="bg-white shadow-sm border border-gray-200 p-4 rounded-lg"
          >
            <p className="text-lg font-semibold">{appt.name}</p>
            <p className="text-gray-600">Plan: {appt.planName}</p>

            <p className="text-gray-800">
              Hora:{" "}
              <span className="font-semibold">
                {new Date(appt.date).toLocaleTimeString("es-CL", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}