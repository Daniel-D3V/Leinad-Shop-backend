import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
dotenv.config();
import { connectMongoDB } from "@core/domain/dist/src/modules/@shared/infra/repository/mongoose"
import * as cookieParser from 'cookie-parser';
import { ApplicationExceptionFilter } from './filters';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await connectMongoDB(true)
  app.use(cookieParser());
  app.useGlobalFilters(new ApplicationExceptionFilter())
  await app.listen(5000);
}
bootstrap();
