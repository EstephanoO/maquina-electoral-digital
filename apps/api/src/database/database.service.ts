import { Injectable } from '@nestjs/common';
import { Pool } from 'pg';
import { databaseConfig } from '../config/database.config';

@Injectable()
export class DatabaseService {
  private pool: Pool;

  constructor() {
    this.pool = new Pool({
      host: databaseConfig.host,
      port: databaseConfig.port,
      user: databaseConfig.username,
      password: databaseConfig.password,
      database: databaseConfig.database,
      ssl: databaseConfig.ssl,
    });
  }

  async testConnection(): Promise<{ status: string; timestamp: string }> {
    try {
      const client = await this.pool.connect();
      const result = await client.query('SELECT NOW() as timestamp');
      client.release();

      return {
        status: 'Database connection successful',
        timestamp: result.rows[0].timestamp,
      };
    } catch (error) {
      throw new Error(`Database connection failed: ${error.message}`);
    }
  }

  getPool(): Pool {
    return this.pool;
  }

  async onModuleDestroy() {
    await this.pool.end();
  }
}
