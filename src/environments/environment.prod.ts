import { LogLevel } from 'src/app/shared/models/log.level.enum';

export const environment = {
  production: true,
  logging: {
    level: LogLevel.ERROR,
  },
  apiUrl: 'https://peladator.herokuapp.com/api',
};
