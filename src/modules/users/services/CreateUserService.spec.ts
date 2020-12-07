import AppError from '@shared/errors/AppError';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import FakeUsersRepository from '../repositories/fakes/fakeUsersRepository';
import FakeHashProvider from '../providers/hashProvider/fakes/FakeHashaProvider';
import CreateUserService from './CreateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUsers: CreateUserService;
let fakeCacheProvider: FakeCacheProvider;
describe('CreateUsers', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    fakeCacheProvider = new FakeCacheProvider();
    createUsers = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
      fakeCacheProvider,
    );
  });
  it('should de able to create a new Users', async () => {
    const user = await createUsers.execute({
      name: 'John Due',
      email: 'jondue@exemple.com',
      password: '1233456',
    });

    expect(user).toHaveProperty('id');
  });
  it('should de able to create a new user whith same email from another', async () => {
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
