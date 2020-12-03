import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import ProvideresController from '../controllers/ProvidersController';
import ProviderDayAvaliabilityController from '../controllers/ProviderDayAvaliabilityController';
import ProviderMonthAvaliabilityController from '../controllers/ProviderMonthAvaliabilityController';

const providersRouter = Router();

const providersController = new ProvideresController();
const providerDayAvaliabilityController = new ProviderDayAvaliabilityController();
const providerMonthAvaliabilityController = new ProviderMonthAvaliabilityController();

providersRouter.use(ensureAuthenticated);

providersRouter.get('/', providersController.index);
providersRouter.get(
  '/:provider_id/month-avaliability',
  providerMonthAvaliabilityController.index,
);
providersRouter.get(
  '/:provider_id/day-avaliability',
  providerDayAvaliabilityController.index,
);

export default providersRouter;
