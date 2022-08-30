export interface Appointment {
  id?: number;
  date: string;
  time: string;
  patient_id: number;
  name?: string;
  confirmed: boolean;
}
