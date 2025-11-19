import { type Client } from "../../types/Client";
import { useRegisterSession } from "../../hooks/useRegisterSession";

interface ClientCardProps {
  client: Client;
  onSessionRegistered: (clientId: number, newUsedSessions: number) => void;
}

export default function ClientCard({ client, onSessionRegistered }: ClientCardProps) {
  const { loading, error, success, registerSession } = useRegisterSession();

  const handleRegisterSession = async () => {
    try {
      await registerSession(client.id);
      // Actualizar el contador
      onSessionRegistered(client.id, client.usedSessions + 1);
    } catch (err) {
      console.error("Error registering session:", err);
    }
  };

  const hasAvailableSessions = client.usedSessions < client.totalSessions;

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

      {/* Mensaje de éxito */}
      {success && (
        <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-md flex items-start gap-2">
          <svg 
            className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" 
            fill="currentColor" 
            viewBox="0 0 20 20"
          >
            <path 
              fillRule="evenodd" 
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" 
              clipRule="evenodd" 
            />
          </svg>
          <p className="text-sm text-green-800 font-medium">
            Session registered successfully!
          </p>
        </div>
      )}

      {/* Mensaje de error */}
      {error && (
        <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-md flex items-start gap-2">
          <svg 
            className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" 
            fill="currentColor" 
            viewBox="0 0 20 20"
          >
            <path 
              fillRule="evenodd" 
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" 
              clipRule="evenodd" 
            />
          </svg>
          <p className="text-sm text-red-800">{error}</p>
        </div>
      )}

      {/* No hay sesiones */}
      {!hasAvailableSessions && !loading && (
        <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-md flex items-start gap-2">
          <svg 
            className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" 
            fill="currentColor" 
            viewBox="0 0 20 20"
          >
            <path 
              fillRule="evenodd" 
              d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" 
              clipRule="evenodd" 
            />
          </svg>
          <p className="text-sm text-yellow-800 font-medium">
            No available sessions for this client
          </p>
        </div>
      )}
      
      {/* Botón */}
      <button
        onClick={handleRegisterSession}
        disabled={loading || !hasAvailableSessions}
        className={`mt-3 px-4 py-2 rounded-md font-medium transition-all duration-200 w-full
          ${
            loading || !hasAvailableSessions
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 shadow-sm hover:shadow"
          }`}
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
              <circle 
                className="opacity-25" 
                cx="12" 
                cy="12" 
                r="10" 
                stroke="currentColor" 
                strokeWidth="4"
                fill="none"
              />
              <path 
                className="opacity-75" 
                fill="currentColor" 
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            Registering...
          </span>
        ) : (
          "Register session today"
        )}
      </button>
    </div>
  );
}