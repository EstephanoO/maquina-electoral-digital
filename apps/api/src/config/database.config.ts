export interface DatabaseConfig {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
  ssl: boolean;
}

export const databaseConfig: DatabaseConfig = {
  host: 'ep-nameless-paper-acuqbw8v-pooler.sa-east-1.aws.neon.tech',
  port: 5432,
  username: 'neondb_owner',
  password: 'npg_cNyuFk2s5GaJ',
  database: 'neondb',
  ssl: true,
};
