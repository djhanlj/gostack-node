import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import AppointmentsRepository from '../repositories/ApointmentsRepositories'
import Appointment from '../models/Appointment';

interface Request {
  provider: string;
  date: Date;
}

class CreateAppointmentService{
  public async execute({provider, date}: Request) : Promise<Appointment> {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);
    const appointmentDate = startOfHour(date);
    console.log(appointmentDate);
    const findAppointmentInsSamedate = await appointmentsRepository.findByDate(appointmentDate);

    if (findAppointmentInsSamedate) {
      throw Error('this appointment is already booked');
    }

    const appointment = appointmentsRepository.create({
      provider,
      date:appointmentDate
    });
    await appointmentsRepository.save(appointment);

    return appointment;
  }
}

export default CreateAppointmentService;
