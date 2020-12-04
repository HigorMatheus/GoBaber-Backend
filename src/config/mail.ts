interface IMailConfig {
  driver: 'ethereal' | 'ses';

  defaults: {
    from: {
      email: string;
      name: string;
    };
  };
}

export default {
  driver: process.env.MAIL_DRIVER || 'ethereal',

  defaults: {
    from: {
      email: 'Equipe@Gobarber.com.br',
      name: 'Equipe Gobarber Rocketseat',
    },
  },
} as IMailConfig;
