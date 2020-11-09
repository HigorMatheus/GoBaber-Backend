import { Router } from 'express';
import multer from 'multer';
import uploudComfig from '../config/upload';
import UserMap from '../Mappers/User';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import CreateUserService from '../services/CreateUsersService';
import UpdateUserAvatarService from '../services/UpdateUserAvatarService';

const usersRouter = Router();
const upload = multer(uploudComfig);

usersRouter.post('/', async (request, response) => {
  try {
    const { name, email, password } = request.body;
    const createUser = new CreateUserService();

    const userdate = await createUser.execute({
      name,
      email,
      password,
    });

    const user = await UserMap.toDTO(userdate);

    return response.json(user);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  async (request, response) => {
    try {
      const updateUserAvatar = new UpdateUserAvatarService();

      const userdate = await updateUserAvatar.execute({
        user_id: request.user.id,
        avatarFilename: request.file.filename,
      });

      const user = UserMap.toDTO(userdate);

      return response.json(user);
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  },
);
export default usersRouter;
