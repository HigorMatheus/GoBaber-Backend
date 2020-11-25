import { container } from 'tsyringe';

import IHashProvider from './hashProvider/models/IHashProvider';

import BCryptProvider from './hashProvider/implementations/BCryptjsHashProvider';

container.registerSingleton<IHashProvider>('HashProvider', BCryptProvider);
