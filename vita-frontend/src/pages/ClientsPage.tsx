import ClientCard from "../components/clients/ClientCard";
import { useClients } from "../hooks/useClients";

export default function ClientsPage() {
    const { clients, loading, error } = useClients();

    if (loading) {
        return <div>Cargando clientes...</div>;
    }

    if (error) {
        return <p style={{ color: "red" }}>{error}</p>;
    }

    return (
        <div style={{ padding: "20px" }}>
        <h1>Clientes</h1>
  
        {clients.map((client) => (
          <ClientCard key={client.id} client={client} />
        ))}
        </div>
    );
}