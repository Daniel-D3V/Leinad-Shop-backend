const MySQLEvents = require('@rodrigogs/mysql-events');

const program = async () => {
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
    name: 'TEST',
    expression: 'test-integration-db.outbox',
    statement: MySQLEvents.STATEMENTS.INSERT,
    onEvent: (event: any) => { // You will receive the events here
      console.log(event);
      console.log(event.affectedRows)
    },
  });
  
  instance.on(MySQLEvents.EVENTS.CONNECTION_ERROR, console.error);
  instance.on(MySQLEvents.EVENTS.ZONGJI_ERROR, console.error);
};

program()
  .then(() => console.log('Waiting for database events...'))
  .catch(console.error);