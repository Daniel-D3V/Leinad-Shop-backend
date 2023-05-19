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
      console.log(event.affectedRows[0].after)
    },
  });
  
  instance.on(MySQLEvents.EVENTS.CONNECTION_ERROR, console.error);
  instance.on(MySQLEvents.EVENTS.ZONGJI_ERROR, console.error);
};

program()
  .then(() => console.log('Waiting for database events...'))
  .catch(console.error);

//   {
//     type: 'INSERT',
//     schema: 'test-integration-db',
//     table: 'outbox',
//     affectedRows: [ { after: [Object], before: undefined } ],
//     affectedColumns: [
//       'id',
//       'payload',
//       'eventName',
//       'timestamp',
//       'status',
//       'error_message',
//       'retry_count'
//     ],
//     timestamp: 1684464280000,
//     nextPosition: 11118,
//     binlogName: 'binlog.000005'
//   }
//   [
//     {
//       after: {
//         id: '7c929350-bc03-4ce4-9d28-4cf57dc67889',
//         payload: '{"id":"7c929350-bc03-4ce4-9d28-4cf57dc67889","eventName":"UserSignupEvent","schemaVersion":"1.0.0","dateTimeOccurred":"2023-05-19T02:44:40.200Z","payload":{"id":"f53f9f33-fea4-4d63-bcc9-f11b703f259c","username":"my username","email":"any_@gmail.com","password":"$2b$10$RKrWQxet7Ms/DKda.bNLy.zjV3QcPvZV9zl6/GOn8OEQnhbv./SOa"}}',
//         eventName: 'UserSignupEvent',
//         timestamp: 2023-05-19T05:44:40.200Z,
//         status: 'PENDING',
//         error_message: 'PENDING',
//         retry_count: 0
//       },
//       before: undefined
//     }
//   ]