import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { EventHandlerModule } from './modules/event-handler/event-handler.module';
import { EventSourcingModule } from './modules/event-sourcing/event-sourcing.module';
import { CategoriesModule } from './modules/categories/categories.module';

@Module({
  imports: [AuthModule, EventHandlerModule, EventSourcingModule, CategoriesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
