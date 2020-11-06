import { Router } from 'express';
import UserMap from '../Mappers/User';
import CreateUserService from '../services/CreateUsersService';

const usersRouter = Router();

usersRouter.post('/', async (request, response) => {
  try {
    const { name, email, password } = request.body;
    const createUser = new CreateUserService();

    const userdate = await createUser.execute({
      name,
      email,
      password,
    });

    const user = UserMap.toDTO(userdate);

    return response.json(user);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default usersRouter;
