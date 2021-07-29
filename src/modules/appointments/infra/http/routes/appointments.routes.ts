import { request, response, Router } from 'express';
import { parseISO } from 'date-fns';
import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/ApointmentsRepositories';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
const appointmentsRouter = Router();

appointmentsRouter.use(ensureAuthenticated);

/*
 appointmentsRouter.get('/', async (request, response) => {
  const appointments = await appointmentsRepository.find();
  return response.json(appointments);
})
 */
appointmentsRouter.post('/', async (request, response) => {
  try{
    const { provider_id, date } = request.body;
    const parseDate = parseISO(date)
    const appointmentsRepository = new AppointmentsRepository();

    const createAppointment = new CreateAppointmentService(
      appointmentsRepository,
    );
    const appointment = await createAppointment.execute({provider_id, date: parseDate})

    return response.json(appointment);

  }catch(err){
    return response.status(400).json({ error: err.message });
  }
})

export default appointmentsRouter;
