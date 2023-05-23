import { Injectable, OnModuleInit } from '@nestjs/common';
import { MysqlResponseInterface } from 'src/services/mysql-consumer/interfaces';
import { MysqlConsumerService } from 'src/services/mysql-consumer/mysql-consumer.service';
import { RabbitMQService } from 'src/services/rabbitmq/rabbitmq.service';
import { OutboxRecordInterface } from './interfaces';
import { RemoveOutboxFactory } from "@core/domain/dist/src/modules/event-sourcing-management/factories"


@Injectable()
export class OutboxConsumerService implements OnModuleInit {


  constructor(
    private readonly eventEmitter: RabbitMQService,
    private readonly mysqlConsumerService: MysqlConsumerService
  ) {}

  onModuleInit(): void {
    this.mysqlConsumerService.setUpConsumer({
      name: "OUTBOX",
      expression: 'test-integration-db.outbox',
      statement: "INSERT"
    }, (events) => this.handleEvents(events))
  }

  private async handleEvents(event: MysqlResponseInterface): Promise<void> {
      event.affectedRows.map(async (event) => {
        const { eventName,id, payload } = event.after as OutboxRecordInterface
        const exchangeName = eventName + "Exchange"
        await this.eventEmitter.assertExchange(exchangeName, "fanout", { durable: true, })
        await this.eventEmitter.publishToExchange(exchangeName, eventName, payload)
        await this.eventEmitter.publishToExchange("amq.fanout", "", payload)
        
        const removeOutboxUsecase = RemoveOutboxFactory.create()
        await removeOutboxUsecase.execute(id)
      })
  }

}