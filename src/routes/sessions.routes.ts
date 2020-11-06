import { Router } from 'express';
import UserMap from '../Mappers/User';
import AuthenticateUserService from '../services/AuthenticateUserService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
  try {
    const { email, password } = request.body;
    const authenticateUser = new AuthenticateUserService();

    const { user: userdate, token } = await authenticateUser.execute({
      email,
      password,
    });

    const user = UserMap.toDTO(userdate);

    return response.json({ user, token });
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default sessionsRouter;
