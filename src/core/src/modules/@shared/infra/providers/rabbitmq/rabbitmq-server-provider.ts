import { Connection, Channel, connect, Message, Options } from "amqplib";

export class RabbitmqServerProvider {
    private conn?: Connection;
    private channel?: Channel;

    constructor(private uri: string) {}

    async start(): Promise<void> {
        if(!this.conn || !this.channel) {
            this.conn = await connect(this.uri);
            this.channel = await this.conn.createChannel();
        }
    }

    async close(): Promise<void> {
        await this.channel?.close();
        await this.conn?.close();
    }

    async publishInQueue(queue: string, message: string) {
        return this.channel!.sendToQueue(queue, Buffer.from(message));
    }

    async assertExchange(exchange: string, type: string, options?: Options.AssertExchange) {
        return this.channel!.assertExchange(exchange, type, options);
    }

    async publishInExchange(
        exchange: string,
        routingKey: string,
        message: string
    ): Promise<boolean> {
        return this.channel!.publish(exchange, routingKey, Buffer.from(message));
    }

    async consume(queue: string, callback:  (message: Message) => Promise<void>) {
        return await this.channel!.consume(queue, async (message) => {
            await callback(message!);
            this.channel!.ack(message!);
        });
    }
}