import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';

import IHashProvider from '../providers/hashProvider/models/IHashProvider';
import User from '../infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';

interface Request {
  user_id: string;
  name: string;
  email: string;
  old_password?: string;
  password?: string;
}
@injectable()
class UpdateProfileService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    user_id,
    name,
    email,
    password,
    old_password,
  }: Request): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('user not fald');
    }

    const userWhitheUpdateEmail = await this.usersRepository.findByEmail(email);

    if (userWhitheUpdateEmail && userWhitheUpdateEmail.id !== user_id) {
      throw new AppError('E-mail alreadys in user');
    }

    user.name = name;
    user.email = email;

    if (password && !old_password) {
      throw new AppError(
        'you need to inform the old password to set a new psassword.',
      );
    }

    if (password && old_password) {
      const checkOldPassword = await this.hashProvider.compareHash(
        old_password,
        user.password,
      );

      if (!checkOldPassword) {
        throw new AppError('Old psassword does not match.');
      }
      user.password = await this.hashProvider.generateHash(password);
    }

    return this.usersRepository.save(user);
  }
}

export default UpdateProfileService;
