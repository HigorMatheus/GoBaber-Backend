// import AppError from '@shared/errors/AppError';
import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/fakeUsersRepository';

import UpdateProfileService from './UpdateProfileService';
import FakeHashProvider from '../providers/hashProvider/fakes/FakeHashaProvider';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfile: UpdateProfileService;
describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    updateProfile = new UpdateProfileService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });
  it('should de able to update the Profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Due',
      email: 'jondue@exemple.com',
      password: '1233456',
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'Johon Trê',
      email: 'jontre@exemple.com',
    });

    expect(updatedUser.name).toBe('Johon Trê');
    expect(updatedUser.email).toBe('jontre@exemple.com');
  });

  it('should de able to chabge to another user email ', async () => {
    await fakeUsersRepository.create({
      name: 'John Due',
      email: 'jondue@exemple.com',
      password: '1233456',
    });

    const user = await fakeUsersRepository.create({
      name: 'test',
      email: 'teste@exemple.com',
      password: '1233456',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'John Due',
        email: 'jondue@exemple.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('should de able to update the password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Due',
      email: 'jondue@exemple.com',
      password: '1233456',
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'Johon Trê',
      email: 'jontre@exemple.com',
      old_password: '1233456',
      password: '102030',
    });

    expect(updatedUser.password).toBe('102030');
  });
  it('should not be able to update the password without old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'John Trê',
        email: 'johntre@example.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('should not be able to update the password wit wrong old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'John Trê',
        email: 'johntre@example.com',
        old_password: '10203030405060',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('should not be able update the profile from non-existing user', async () => {
    expect(
      updateProfile.execute({
        user_id: 'non-existing-user-id',
        name: 'John Trê',
        email: 'johntre@example.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
