import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
dotenv.config();
import { connectMongoDB } from "@core/domain/dist/src/modules/@shared/infra/repository/mongoose"

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await connectMongoDB(true)
  await app.startAllMicroservices();
  await app.listen(5000);
}
bootstrap();
