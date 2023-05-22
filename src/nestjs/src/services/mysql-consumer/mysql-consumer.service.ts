import { Injectable } from '@nestjs/common';
import { MysqlConfigInterface, MysqlResponseInterface } from './interfaces';
const MySQLEvents = require('@rodrigogs/mysql-events');

@Injectable()
export class MysqlConsumerService {

  async setUpConsumer(config: MysqlConfigInterface, callback: (event: MysqlResponseInterface) => void): Promise<void> {
    const instance = new MySQLEvents({
        host: 'localhost',
        port: 33010,
        user: 'root',
        password: 'password',
      }, {
        
        startAtEnd: true,
        excludedSchemas: {
          mysql: true,
        },
      });
    
      await instance.start();
    
      instance.addTrigger({
        name: config.name,
        expression: config.expression,
        statement: MySQLEvents.STATEMENTS.INSERT,
        onEvent: callback
      });
      
      instance.on(MySQLEvents.EVENTS.CONNECTION_ERROR, console.error);
      instance.on(MySQLEvents.EVENTS.ZONGJI_ERROR, console.error);
  }
    
}
