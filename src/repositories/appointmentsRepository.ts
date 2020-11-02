import { isEqual } from 'date-fns';
import Appointment from '../models/appointment';

interface ICreateAppoitmentDTO {
  provider: string;
  date: Date;
}

class AppointmentsRepository {
  private appointments: Appointment[];

  constructor() {
    this.appointments = [];
  }

  public all(): Appointment[] {
    return this.appointments;
  }

  public findByDate(date: Date): Appointment | null {
    const findAppintment = this.appointments.find(appointment => {
      return isEqual(date, appointment.date);
    });

    return findAppintment || null;
  }

  public create({ date, provider }: ICreateAppoitmentDTO): Appointment {
    const appointment = new Appointment({ provider, date });
    this.appointments.push(appointment);

    return appointment;
  }
}

export default AppointmentsRepository;
