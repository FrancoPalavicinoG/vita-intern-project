import { type Client } from "../../types/Client";
import { useRegisterSession } from "../../hooks/useRegisterSession";

export default function ClientCard({ client }: { client: Client }) {
  const { loading, error, success, registerSession } = useRegisterSession();

  return (
    <div className="border border-gray-200 shadow-sm rounded-lg p-4 mb-4 bg-white">
      {/* Nombre */}
      <h3 className="text-xl font-semibold text-gray-800">{client.name}</h3>

      {/* Info básica */}
      <p className="text-gray-600">Email: {client.email || "N/A"}</p>
      <p className="text-gray-600">Teléfono: {client.phone || "N/A"}</p>

      {/* Información del plan */}
      <p className="mt-2 text-gray-800">
        <strong className="font-medium">{client.planName}</strong>{" "}
        — {client.usedSessions} / {client.totalSessions} sesiones
      </p>

      {/* Botón */}
      <button
        onClick={() => registerSession(client.id)}
        disabled={loading}
        className={`mt-3 px-4 py-2 rounded-md transition 
          ${
            loading
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
      >
        {loading ? "Registrando..." : "Registrar sesión hoy"}
      </button>

      {/* Errores */}
      {error && <p className="mt-2 text-red-500 text-sm">{error}</p>}

      {/* Mensaje de éxito */}
      {success && <p className="mt-2 text-green-600 text-sm">{success}</p>}
    </div>
  );
}