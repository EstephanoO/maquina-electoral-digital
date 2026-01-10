import { Controller, Get, Logger } from '@nestjs/common';
import { AppService } from './app.service';
import { DatabaseService } from './database/database.service';

@Controller()
export class AppController {
  private readonly logger = new Logger(AppController.name);

  constructor(
    private readonly appService: AppService,
    private readonly databaseService: DatabaseService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('health')
  async getHealth(): Promise<{
    status: string;
    database: any;
    timestamp: string;
  }> {
    try {
      this.logger.log('Health check requested');
      const dbResult = await this.databaseService.testConnection();
      this.logger.log('Database connection successful');
      return {
        status: 'API is healthy',
        database: dbResult,
        timestamp: new Date().toISOString(),
      };
    } catch (error: any) {
      this.logger.error('Database connection failed', error.stack);
      return {
        status: 'API has issues',
        database: { error: error.message, stack: error.stack },
        timestamp: new Date().toISOString(),
      };
    }
  }

  @Get('debug')
  getDebug(): any {
    return {
      message: 'Debug endpoint',
      timestamp: new Date().toISOString(),
      env: process.env.NODE_ENV,
      databaseHost: process.env.DB_HOST || 'not_set',
    };
  }
}
