import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { EventSourcingModule } from './modules/event-sourcing/event-sourcing.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { RabbitMQService } from './services/rabbitmq/rabbitmq.service';
import { MysqlConsumerService } from './services/mysql-consumer/mysql-consumer.service';
import { AnnounceManagementModule } from './modules/announce/announce-management/announce-management.module';

@Module({
  imports: [
    AuthModule, 
    EventSourcingModule, 
    CategoriesModule, AnnounceManagementModule, 
  ],
  controllers: [],
  providers: [RabbitMQService, MysqlConsumerService],
})
export class AppModule {}
