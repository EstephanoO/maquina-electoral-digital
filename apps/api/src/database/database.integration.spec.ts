import { DatabaseService } from './database.service';

describe('Database Connection Tests', () => {
  let service: DatabaseService;

  beforeAll(async () => {
    service = new DatabaseService();
  });

  afterAll(async () => {
    if (service) {
      await service.onModuleDestroy();
    }
  });

  describe('Database Service', () => {
    it('should be defined', () => {
      expect(service).toBeDefined();
    });

    it('should have correct database configuration', () => {
      const config = require('../config/database.config').databaseConfig;

      console.log('🔍 Database Configuration Test:');
      console.log('Host:', config.host);
      console.log('Port:', config.port);
      console.log('Username:', config.username);
      console.log('Database:', config.database);
      console.log('SSL:', config.ssl);
      console.log(
        'Password Length:',
        config.password ? config.password.length : 0,
      );

      expect(config.host).toContain('neon.tech');
      expect(config.port).toBe(5432);
      expect(config.username).toBe('neondb_owner');
      expect(config.database).toBe('neondb');
      expect(config.ssl).toBe(true);
    });

    it('should connect to Neon database successfully', async () => {
      console.log('🔗 Testing database connection...');

      try {
        const result = await service.testConnection();

        console.log('✅ Connection successful!');
        console.log('Result:', result);

        expect(result).toBeDefined();
        expect(result.status).toContain('successful');
        expect(result.timestamp).toBeDefined();
      } catch (error) {
        console.error('❌ Connection failed:', error.message);
        console.error('Error details:', error);
        throw error;
      }
    });

    it('should execute basic query', async () => {
      console.log('📊 Testing basic query execution...');

      const pool = service.getPool();
      const client = await pool.connect();

      try {
        const result = await client.query(
          'SELECT NOW() as server_time, version() as db_version',
        );
        console.log('✅ Query successful!');
        console.log('Server time:', result.rows[0].server_time);
        console.log('Database version:', result.rows[0].db_version);

        expect(result.rows).toHaveLength(1);
        expect(result.rows[0].server_time).toBeDefined();
        expect(result.rows[0].db_version).toBeDefined();
      } finally {
        client.release();
      }
    });
  });

  describe('Pool Configuration', () => {
    it('should have a valid connection pool', () => {
      const pool = service.getPool();
      expect(pool).toBeDefined();
      expect(pool.totalCount).toBeGreaterThanOrEqual(0);
      expect(pool.idleCount).toBeGreaterThanOrEqual(0);
      expect(pool.waitingCount).toBeGreaterThanOrEqual(0);
    });
  });
});
