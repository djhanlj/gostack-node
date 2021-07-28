import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import AppError from '@shared/errors/AppError';
import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/ApointmentsRepositories'
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import User from '@modules/users/infra/typeorm/entities/User';

interface Request {
  provider_id: string;
  date: Date;
}

class CreateAppointmentService{
  public async execute({provider_id, date}: Request) : Promise<Appointment> {
    console.log(provider_id, date)
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
