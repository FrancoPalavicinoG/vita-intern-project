export interface ZeroSessionClient {
    id: number;
    name: string;
    email: string | null;
    phone: string | null;
  }
  
  export interface AppointmentSummary {
    id: number;
    clientId: number;
    date: string;
    name: string;
    email: string | null;
    phone: string | null;
    planName: string;
    totalSessions: number;
    usedSessions: number;
  }
  
  export interface Summary {
    date: string;
    totalAppointments: number;
    uniqueClients: number;
    sessionUsed: number;
    clientsWithZeroSessions: ZeroSessionClient[];
    appointments: AppointmentSummary[];
  }