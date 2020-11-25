import AppError from '@shared/errors/AppError';
import FakeHashProvider from '../providers/hashProvider/fakes/FakeHashaProvider';
import FakeUsersRepository from '../repositories/fakes/fakeUsersRepository';

import AutenticateUserService from './AuthenticateUserService';
import CreateUserService from './CreateUserService';

describe('CreateUsers', () => {
  it('should de able to Autentcate', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    const autenticateUsers = new AutenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    const user = await createUser.execute({
      name: 'Jon Due',
      email: 'jondue@exemple.com',
      password: '1233456',
    });

    const response = await autenticateUsers.execute({
      email: 'jondue@exemple.com',
      password: '1233456',
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });

  it('should not be able to autenticate with nom exists user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const autenticateUsers = new AutenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    expect(
      autenticateUsers.execute({
        email: 'jondue@exemple.com',
        password: '1233456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to autenticate with whith wrong password', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    const autenticateUsers = new AutenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    await createUser.execute({
      name: 'Jon Due',
      email: 'jondue@exemple.com',
      password: '1233456',
    });

    expect(
      autenticateUsers.execute({
        email: 'jondue@exemple.com',
        password: 'wrong-password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
