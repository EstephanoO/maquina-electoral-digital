import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { DatabaseService } from './database/database.service';

@Controller()
export class AppController {
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
      const dbResult = await this.databaseService.testConnection();
      return {
        status: 'API is healthy',
        database: dbResult,
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      return {
        status: 'API has issues',
        database: { error: error.message },
        timestamp: new Date().toISOString(),
      };
    }
  }
}
