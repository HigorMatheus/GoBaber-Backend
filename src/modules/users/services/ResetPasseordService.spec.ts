import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/fakeUsersRepository';
import ResetPasswordService from './ResetPasswordService';
import FakeUsersTokensRepository from '../repositories/fakes/fakeUserTokensRepository';
import FakeHashProvider from '../providers/hashProvider/fakes/FakeHashaProvider';

let fakeUsersRepository: FakeUsersRepository;

let fakeUserTokensRepository: FakeUsersTokensRepository;
let resetPassword: ResetPasswordService;
let fakeHashProvider: FakeHashProvider;

describe('ResetPasswordService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    fakeUserTokensRepository = new FakeUsersTokensRepository();

    resetPassword = new ResetPasswordService(
      fakeUsersRepository,
      fakeUserTokensRepository,
      fakeHashProvider,
    );
  });
  it('should be able to reset the password ', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Due',
      email: 'jondue@exemple.com',
      password: '1233456',
    });

    const { token } = await fakeUserTokensRepository.generate(user.id);

    const generateHask = jest.spyOn(fakeHashProvider, 'generateHash');

    await resetPassword.execute({
      password: '102030',
      token,
    });

    const updatedUser = await fakeUsersRepository.findById(user.id);

    expect(generateHask).toHaveBeenCalledWith('102030');
    expect(updatedUser?.password).toBe('102030');
  });

  it('should not be able to reset the password with now-exists token', async () => {
    await expect(
      resetPassword.execute({
        token: 'now-exists-token',
        password: '102030',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to reset the password with now-exists user', async () => {
    const { token } = await fakeUserTokensRepository.generate(
      'now-exists-user',
    );
    await expect(
      resetPassword.execute({
        token,
        password: '102030',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to reset password if passed more than 2 hours ', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Due',
      email: 'jondue@exemple.com',
      password: '1233456',
    });

    const { token } = await fakeUserTokensRepository.generate(user.id);

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      const custonDate = new Date();

      return custonDate.setHours(custonDate.getHours() + 3);
    });

    await expect(
      resetPassword.execute({
        password: '102030',
        token,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
