import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { EventHandlerModule } from './event-handler/event-handler.module';

@Module({
  imports: [AuthModule, EventHandlerModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
