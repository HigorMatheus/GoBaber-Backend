import AppError from '@shared/errors/AppError';

import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import FakeUsersRepository from '../repositories/fakes/fakeUsersRepository';
import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';
import FakeUsersTokensRepository from '../repositories/fakes/fakeUserTokensRepository';

let fakeUsersRepository: FakeUsersRepository;
let fakeMailProvider: FakeMailProvider;
let fakeUserTokensRepository: FakeUsersTokensRepository;
let SendForgotPasswordEmail: SendForgotPasswordEmailService;

describe('SendForgotPasswordEmail', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeMailProvider = new FakeMailProvider();
    fakeUserTokensRepository = new FakeUsersTokensRepository();

    SendForgotPasswordEmail = new SendForgotPasswordEmailService(
      fakeUsersRepository,
      fakeMailProvider,
      fakeUserTokensRepository,
    );
  });
  it('should be able to recover the password using the email', async () => {
    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');
    await fakeUsersRepository.create({
      name: 'John Due',
      email: 'jondue@exemple.com',
      password: '1233456',
    });

    await SendForgotPasswordEmail.execute({
      email: 'jondue@exemple.com',
    });

    expect(sendMail).toHaveBeenCalled();
  });

  it('ahould not be able to recover a not-existing user password', async () => {
    await expect(
      SendForgotPasswordEmail.execute({
        email: 'jondue@exemple.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should generate a forgout password token', async () => {
    const generateToken = jest.spyOn(fakeUserTokensRepository, 'generate');

    const user = await fakeUsersRepository.create({
      name: 'John Due',
      email: 'jondue@exemple.com',
      password: '1233456',
    });

    await SendForgotPasswordEmail.execute({
      email: 'jondue@exemple.com',
    });

    expect(generateToken).toHaveBeenCalledWith(user.id);
  });
});
