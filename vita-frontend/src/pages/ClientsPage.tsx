import ClientCard from "../components/clients/ClientCard";
import { useClients } from "../hooks/useClients";

export default function ClientsPage() {
  const { clients, loading, error } = useClients();

  if (loading) {
    return (
      <div className="text-center text-gray-600 text-lg mt-10">
        Cargando clientes...
      </div>
    );
  }

  if (error) {
    return (
      <p className="text-center text-red-500 text-lg mt-10">
        {error}
      </p>
    );
  }

  return (
    <div className="px-6 py-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Clientes</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {clients.map((client) => (
          <ClientCard key={client.id} client={client} />
        ))}
      </div>
    </div>
  );
}