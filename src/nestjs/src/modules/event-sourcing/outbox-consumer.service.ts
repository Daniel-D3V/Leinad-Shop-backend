import { Injectable, OnModuleInit } from '@nestjs/common';
import { MysqlResponseInterface } from 'src/services/mysql-consumer/interfaces';
import { MysqlConsumerService } from 'src/services/mysql-consumer/mysql-consumer.service';
import { RabbitMQService } from 'src/services/rabbitmq/rabbitmq.service';

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
    }, this.handleEvents)
  }

  private async handleEvents(event: MysqlResponseInterface): Promise<void> {
      console.log(event)
      

      // event.affectedRows.map(async (event: any) => {
      //     const { eventName, payload } = event.after
      //     await this.eventEmitter.publishToExchange("amq.fanout", eventName, payload)
      // })

  }

  // Add additional methods as needed
}