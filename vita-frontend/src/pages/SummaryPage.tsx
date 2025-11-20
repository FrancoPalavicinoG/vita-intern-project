import { useSummary } from "../hooks/useSummary";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

export default function SummaryPage() {
  const today = new Date().toISOString().split("T")[0];
  const { summary, loading, error } = useSummary(today);

  // ——— Loading ———
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <svg 
            className="animate-spin h-12 w-12 text-blue-600 mx-auto mb-4" 
            viewBox="0 0 24 24"
          >
            <circle 
              className="opacity-25" cx="12" cy="12" r="10" 
              stroke="currentColor" strokeWidth="4" fill="none"
            />
            <path 
              className="opacity-75" fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 
                 0 5.373 0 12h4zm2 5.291A7.962 
                 7.962 0 014 12H0c0 3.042 1.135 
                 5.824 3 7.938l3-2.647z"
            />
          </svg>
          <p className="text-gray-600 text-lg">Loading summary...</p>
        </div>
      </div>
    );
  }

  // ——— Error ———
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
          <div className="flex items-start gap-3">
            <svg 
              className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" 
              fill="currentColor" viewBox="0 0 20 20"
            >
              <path 
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 
                   000 16zM8.707 7.293a1 1 0 
                   00-1.414 1.414L8.586 10l-1.293 
                   1.293a1 1 0 101.414 1.414L10 
                   11.414l1.293 1.293a1 1 0 
                   001.414-1.414L11.414 10l1.293-1.293a1 
                   1 0 00-1.414-1.414L10 8.586 
                   8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
            <div>
              <h3 className="text-red-800 font-semibold mb-1">
                Error loading summary
              </h3>
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!summary) return null;

  const localDateString = summary.date + "T00:00:00"; 
  const readableDate = new Date(localDateString).toLocaleDateString("es-ES", {
      day: "numeric",
      month: "long",
      year: "numeric"
  });

  return (
    <div className="px-6 py-4 max-w-7xl mx-auto">

      {/* ——— Title ——— */}
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Resumen del día <span className="text-blue-600">{readableDate}</span>
      </h1>

      {/* ——— Sesiones por hora ——— */}
      <div className="bg-white shadow-sm border border-gray-200 p-5 rounded-xl mb-10">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Citas por hora </h2>

        {(() => {
          const hoursMap: Record<string, number> = {};
          summary.appointments.forEach((a) => {
            const date = new Date(a.date);
            const hour = date.getHours();
            const label = `${String(hour).padStart(2, '0')}:00`;
            hoursMap[label] = (hoursMap[label] || 0) + 1;
          });

          const hourlyData = Object.keys(hoursMap)
            .sort()
            .map((hour) => ({ hour, count: hoursMap[hour] }));

          if (hourlyData.length === 0) {
            return (
              <div className="p-6 bg-gray-50 border border-gray-100 rounded-lg text-center text-gray-600">
                No hay citas registradas hoy.
              </div>
            );
          }

          return (
            <div className="w-full h-56">
              <ResponsiveContainer>
                <BarChart data={hourlyData} margin={{ top: 8, right: 12, left: -8, bottom: 6 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                  <XAxis dataKey="hour" tick={{ fontSize: 12 }} />
                  <YAxis allowDecimals={false} />
                  <Tooltip />
                  <Bar dataKey="count" fill="#3b82f6" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          );
        })()}
      </div>

      {/* ——— KPI Cards ——— */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
        <div className="bg-white shadow-sm border border-gray-200 p-5 rounded-xl">
          <h2 className="text-lg font-semibold text-gray-700">Citas realizadas</h2>
          <p className="text-4xl font-extrabold text-blue-600 mt-3">
            {summary.totalAppointments}
          </p>
        </div>

        <div className="bg-white shadow-sm border border-gray-200 p-5 rounded-xl">
          <h2 className="text-lg font-semibold text-gray-700">Clientes únicos</h2>
          <p className="text-4xl font-extrabold text-green-600 mt-3">
            {summary.uniqueClients}
          </p>
        </div>

        <div className="bg-white shadow-sm border border-gray-200 p-5 rounded-xl">
          <h2 className="text-lg font-semibold text-gray-700">Clientes sin sesiones restantes</h2>
          <p className="text-4xl font-extrabold text-red-600 mt-3">
            {summary.clientsWithZeroSessions.length}
          </p>
        </div>
      </div>

      {/* ——— Clients with 0 sessions ——— */}
      <h2 className="text-2xl font-semibold text-gray-800 mb-3">
        Clientes sin sesiones restantes
      </h2>

      {summary.clientsWithZeroSessions.length === 0 ? (
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-2 mb-10">
          <svg 
            className="w-5 h-5 text-green-600 mt-0.5" 
            fill="currentColor" viewBox="0 0 20 20"
          >
            <path 
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 
                 0 000 16zm3.707-9.293a1 1 0 
                 00-1.414-1.414L9 10.586 7.707 
                 9.293a1 1 0 00-1.414 1.414l2 
                 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
          <p className="text-green-800 font-medium">
            Ningún cliente quedó sin sesiones hoy!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
          {summary.clientsWithZeroSessions.map((client) => (
            <div
              key={client.id}
              className="bg-white shadow-sm border border-gray-200 p-4 rounded-lg"
            >
              <p className="text-lg font-semibold text-gray-800">{client.name}</p>
              <p className="text-gray-600">Email: {client.email || "N/A"}</p>
              <p className="text-gray-600">Teléfono: {client.phone || "N/A"}</p>

              <a
                href={`https://wa.me/${client.phone?.replace("+", "")}`}
                target="_blank"
                rel="noreferrer"
              >
                <button className="mt-3 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition shadow-sm hover:shadow">
                  Contactar por WhatsApp
                </button>
              </a>
            </div>
          ))}
        </div>
      )}

      {/* ——— Appointments ——— */}
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Detalle de citas del día
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
        {summary.appointments.map((appt) => (
          <div
            key={appt.id}
            className="bg-white shadow-sm border border-gray-200 p-4 rounded-lg"
          >
            <div className="flex justify-between items-start mb-3 border-b pb-3">
              <p className="text-lg font-semibold text-gray-800">{appt.name}</p>
              <span className="text-xs font-semibold px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full border border-indigo-200 flex-shrink-0 ml-4">
                  {appt.planName}
              </span>
            </div>

            <p className="text-gray-800 mt-1 font-semibold italic">
              Hora:{" "}
              <span className="font-semibold text-blue-700">
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