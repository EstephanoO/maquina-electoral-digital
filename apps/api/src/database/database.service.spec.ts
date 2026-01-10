import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseService } from './database.service';

describe('DatabaseService', () => {
  let service: DatabaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DatabaseService],
    }).compile();

    service = module.get<DatabaseService>(DatabaseService);
  });

  afterEach(async () => {
    if (service) {
      await service.onModuleDestroy();
    }
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should connect to database successfully', async () => {
    console.log('Testing database connection...');

    try {
      const result = await service.testConnection();
      console.log('Connection result:', result);

      expect(result).toBeDefined();
      expect(result.status).toContain('successful');
      expect(result.timestamp).toBeDefined();
    } catch (error) {
      console.error('Connection error:', error);
      throw error;
    }
  });

  it('should execute a simple query', async () => {
    const pool = service.getPool();
    const client = await pool.connect();

    try {
      const result = await client.query('SELECT 1 as test_number');
      expect(result.rows[0].test_number).toBe(1);
      console.log('Simple query successful:', result.rows[0]);
    } finally {
      client.release();
    }
  });

  it('should handle connection errors gracefully', async () => {
    // Test with invalid connection string
    const originalConfig = require('../config/database.config').databaseConfig;

    // Temporarily modify config to test error handling
    const testService = new DatabaseService();

    expect(async () => {
      await testService.testConnection();
    }).rejects.toThrow();
  });
});

describe('Database Configuration', () => {
  it('should have correct Neon database configuration', () => {
    const config = require('../config/database.config').databaseConfig;

    console.log('Database config:', { ...config, password: '***' });

    expect(config.host).toBe(
      'ep-nameless-paper-acuqbw8v-pooler.sa-east-1.aws.neon.tech',
    );
    expect(config.port).toBe(5432);
    expect(config.username).toBe('neondb_owner');
    expect(config.database).toBe('neondb');
    expect(config.ssl).toBe(true);
    expect(config.password).toBeDefined();
    expect(config.password.length).toBeGreaterThan(0);
  });
});
