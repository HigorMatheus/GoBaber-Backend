import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProviderDayAvaliabilityService from '@modules/appointments/services/ListProviderDayAvaliabilityService';

export default class ProviderDayAvaliabilityController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { provider_id } = request.params;
    const { day, month, year } = request.query;

    const ListProviderDayAvaliability = container.resolve(
      ListProviderDayAvaliabilityService,
    );

    const avaliability = await ListProviderDayAvaliability.execute({
      provider_id,
      day: Number(day),
      month: Number(month),
      year: Number(year),
    });

    return response.json(avaliability);
  }
}
