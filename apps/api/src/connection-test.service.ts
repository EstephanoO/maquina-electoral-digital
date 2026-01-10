import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class ConnectionTestService {
  private readonly logger = new Logger(ConnectionTestService.name);

  testConnection() {
    this.logger.log('Testing database connection...');

    const config = {
      host: 'ep-nameless-paper-acuqbw8v-pooler.sa-east-1.aws.neon.tech',
      port: 5432,
      user: 'neondb_owner',
      password: 'npg_cNyuFk2s5GaJ',
      database: 'neondb',
      ssl: true,
    };

    this.logger.log('Database config:', { ...config, password: '***' });

    return {
      config: { ...config, password: '***' },
      timestamp: new Date().toISOString(),
    };
  }
}
