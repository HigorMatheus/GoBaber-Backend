import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentRepository';
import ListProviderMonthAvaliabilityService from './ListProviderMonthAvaliabilityService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderMonthAvaliability: ListProviderMonthAvaliabilityService;

describe('listProviderMonthAvaliability', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listProviderMonthAvaliability = new ListProviderMonthAvaliabilityService(
      fakeAppointmentsRepository,
    );
  });

  it('should be able to list the month avaliability from providers', async () => {
    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      user_id: '102030',
      date: new Date(2020, 4, 20, 8, 0, 0),
    });
    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      user_id: '102030',
      date: new Date(2020, 4, 20, 9, 0, 0),
    });
    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      user_id: '102030',
      date: new Date(2020, 4, 20, 10, 0, 0),
    });
    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      user_id: '102030',
      date: new Date(2020, 4, 20, 11, 0, 0),
    });
    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      user_id: '102030',
      date: new Date(2020, 4, 20, 12, 0, 0),
    });
    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      user_id: '102030',
      date: new Date(2020, 4, 20, 13, 0, 0),
    });
    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      user_id: '102030',
      date: new Date(2020, 4, 20, 14, 0, 0),
    });
    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      user_id: '102030',
      date: new Date(2020, 4, 20, 15, 0, 0),
    });
    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      user_id: '102030',
      date: new Date(2020, 4, 20, 16, 0, 0),
    });
    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      user_id: '102030',
      date: new Date(2020, 4, 20, 17, 0, 0),
    });
    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      user_id: '102030',
      date: new Date(2020, 4, 21, 8, 0, 0),
    });
    const avaliability = await listProviderMonthAvaliability.execute({
      provider_id: 'user',
      year: 2020,
      month: 5,
    });

    expect(avaliability).toEqual(
      expect.arrayContaining([
        { day: 19, available: true },
        { day: 20, available: false },
        { day: 21, available: true },
        { day: 22, available: true },
      ]),
    );
  });
});
