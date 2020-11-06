import User from '../models/User';

export default class UserMap {
  public static toDTO(user: User): Omit<User, 'password'> {
    return user;
  }
}
