import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { swaggerConfig } from './config/swagger.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app?.useGlobalPipes(new ValidationPipe())
  swaggerConfig(app);   //Setup Swagger separately
  await app.listen(process.env.PORT ?? 3003);
}
bootstrap();
