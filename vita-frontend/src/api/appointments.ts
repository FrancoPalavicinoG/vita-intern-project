import api from "./http";

export async function createAppointment(clientId: number) {
   return api.post("/appointments", { clientId });
}