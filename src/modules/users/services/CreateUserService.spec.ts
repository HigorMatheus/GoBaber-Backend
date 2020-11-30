import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/fakeUsersRepository';
import FakeHashProvider from '../providers/hashProvider/fakes/FakeHashaProvider';
import CreateUserService from './CreateUserService';

describe('CreateUsers', () => {
  it('should de able to create a new Users', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const createUsers = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    const user = await createUsers.execute({
      name: 'John Due',
      email: 'jondue@exemple.com',
      password: '1233456',
    });

    expect(user).toHaveProperty('id');
  });
  it('should de able to create a new user whith same email from another', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const createUsers = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    await createUsers.execute({
      name: 'John Due',
      email: 'jondue@exemple.com',
      password: '1233456',
    });

    await expect(
      createUsers.execute({
        name: 'John Due',
        email: 'jondue@exemple.com',
        password: '1233456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
