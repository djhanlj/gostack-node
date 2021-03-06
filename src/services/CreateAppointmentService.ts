import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import AppError from '../errors/AppError';
import AppointmentsRepository from '../repositories/ApointmentsRepositories'
import Appointment from '../models/Appointment';
import User from '../models/User';

interface Request {
  provider_id: string;
  date: Date;
}

class CreateAppointmentService{
  public async execute({provider_id, date}: Request) : Promise<Appointment> {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);
    const appointmentDate = startOfHour(date);
    const findAppointmentInsSamedate = await appointmentsRepository.findByDate(appointmentDate);

    if (findAppointmentInsSamedate) {
      throw new AppError('This appointment is already booked');
    }

    const appointment = appointmentsRepository.create({
      provider_id,
      date:appointmentDate
    });
    await appointmentsRepository.save(appointment);

    return appointment;
  }
}

export default CreateAppointmentService;
