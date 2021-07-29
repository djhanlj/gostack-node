
 import { request, response, Router } from 'express';

 import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';
 import UsersRepository from '../../typeorm/repositories/UsersRepository';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
  try {
    const usersRepository = new UsersRepository();
    const authenticateUser = new AuthenticateUserService(usersRepository);

    const { email, password } = request.body;
    const { user, token } = await authenticateUser.execute({
      email,
      password,
    });

    const userWithoutPassword = {
      id: user.id,
      name: user.name,
      email: user.email,
      created_at: user.created_at,
      updated_at: user.updated_at,
    };

    return response.json({ user: userWithoutPassword, token });
  } catch (err) {
    console.log("motivo do erro ", err.message);
    return response.status(err.statusCode).json({ error: err.message });
  }
});

export default sessionsRouter;
