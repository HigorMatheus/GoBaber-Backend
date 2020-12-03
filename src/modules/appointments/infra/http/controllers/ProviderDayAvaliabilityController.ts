import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProviderDayAvaliabilityService from '@modules/appointments/services/ListProviderDayAvaliabilityService';

export default class ProviderDayAvaliabilityController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { provider_id } = request.params;
    const { day, month, year } = request.body;

    const ListProviderDayAvaliability = container.resolve(
      ListProviderDayAvaliabilityService,
    );

    const avaliability = await ListProviderDayAvaliability.execute({
      day,
      month,
      provider_id,
      year,
    });

    return response.json(avaliability);
  }
}
