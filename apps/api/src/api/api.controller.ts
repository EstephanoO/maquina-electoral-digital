import { Controller, Get } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';

@Controller('api')
export class ApiController {
  constructor(private readonly databaseService: DatabaseService) {}

  @Get('status')
  async getApiStatus() {
    try {
      const dbResult = await this.databaseService.testConnection();
      return {
        success: true,
        message: 'Máquina Electoral Digital - API funcionando correctamente',
        database: {
          connected: true,
          status: dbResult.status,
          timestamp: dbResult.timestamp,
        },
        api: {
          status: 'healthy',
          version: '1.0.0',
          environment: process.env.NODE_ENV || 'development',
        },
        timestamp: new Date().toISOString(),
      };
    } catch (error: any) {
      return {
        success: false,
        message: 'Error en conexión a base de datos',
        error: error.message,
        database: {
          connected: false,
          error: error.message,
        },
        timestamp: new Date().toISOString(),
      };
    }
  }
}
