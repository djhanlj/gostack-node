import Appointment from '../models/Appointment';
import { startOfHour } from 'date-fns';
import AppointmentsRepository from '../repositories/ApointmentsRepositories'

interface Request {
  provider: string;
  date: Date;
}

class CreateAppointmentService{

  private appointmentsRepository;

  constructor(appointmentsRepository: AppointmentsRepository){
    this.appointmentsRepository = appointmentsRepository;
  }

  public execute({provider, date}: Request) : Appointment {

    const appointmentDate = startOfHour(date);
    const findAppointmentInsSamedate = this.appointmentsRepository.findByDate(appointmentDate);

    if (findAppointmentInsSamedate) {
      throw Error('this appointment is already booked');
      //return response.status(400).json({ message: "this appointment is already booked" });
    }

    const appointment = this.appointmentsRepository.create({
      provider,
      date:appointmentDate
    });

    return appointment;
  }
}

export default CreateAppointmentService;
