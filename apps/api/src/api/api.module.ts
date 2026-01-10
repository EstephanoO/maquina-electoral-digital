import { Module } from '@nestjs/common';
import { ApiController } from './api.controller';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [ApiController],
  providers: [],
})
export class ApiModule {}
