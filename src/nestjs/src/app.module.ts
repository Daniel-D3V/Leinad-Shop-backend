import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { EventHandlerModule } from './event-handler/event-handler.module';
import { EventSourcingModule } from './event-sourcing/event-sourcing.module';
import { CategoriesModule } from './categories/categories.module';

@Module({
  imports: [AuthModule, EventHandlerModule, EventSourcingModule, CategoriesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
