export interface Client {
    id: number;
    name: string;
    email: string | null;
    phone: string | null;
    planName: string;
    totalSessions: number;
    usedSessions: number;
}