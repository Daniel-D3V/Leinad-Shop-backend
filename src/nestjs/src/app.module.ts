import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { EventSourcingModule } from './modules/event-sourcing/event-sourcing.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { RabbitMQService } from './services/rabbitmq/rabbitmq.service';
import { MysqlConsumerService } from './services/mysql-consumer/mysql-consumer.service';
import { AnnounceManagementModule } from './modules/announce/announce-management/announce-management.module';
import { AnnounceInfoModule } from './modules/announce/announce-info/announce-info.module';
import { AnnounceNormalModule } from './modules/announce/announce-types/announce-normal/announce-normal.module';
import { AnnounceItemModule } from './modules/announce/announce-types/announce-item/announce-item.module';

@Module({
  imports: [
    AuthModule, 
    EventSourcingModule, 
    CategoriesModule, AnnounceManagementModule, AnnounceInfoModule, AnnounceNormalModule, AnnounceItemModule, 
  ],
  controllers: [],
  providers: [RabbitMQService, MysqlConsumerService],
})
export class AppModule {}
