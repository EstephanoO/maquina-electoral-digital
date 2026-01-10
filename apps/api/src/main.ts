import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS for Next.js frontend
  app.enableCors({
    origin: [
      'http://localhost:3000',
      'http://localhost:3002',
      'https://maquina-electoral-digital.vercel.app',
    ],
    credentials: true,
  });

  // Global validation pipe
  app.useGlobalPipes(new ValidationPipe());

  const port = process.env.PORT || 3001;
  console.log(`Starting NestJS API on port ${port}`);

  await app.listen(port);
}
bootstrap();
