import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

// Service | Auth

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.NATS,
    options: {
      servers: ['nats://localhost:4222'],
      retryAttempts: 5,
      retryDelay: 3000,
    },
  });
  await app.startAllMicroservices();
  await app.listen(3003);
  console.log(`Auth Service is running on: ${await app.getUrl()}`);
}
bootstrap();
