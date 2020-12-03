import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProviderMonthAvaliabilityService from '@modules/appointments/services/ListProviderMonthAvaliabilityService';

export default class ProviderMonthAvaliabilityController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { provider_id } = request.params;
    const { month, year } = request.body;

    const ListProviderMonthAvaliability = container.resolve(
      ListProviderMonthAvaliabilityService,
    );

    const avaliability = await ListProviderMonthAvaliability.execute({
      month,
      provider_id,
      year,
    });

    return response.json(avaliability);
  }
}
