

const { Kafka } = require('kafkajs');
const kafka = new Kafka({
    clientId: 'order-service',
    brokers: ['localhost:9092', 'localhost:9094', 'localhost:9095']

})


const consumer = kafka.consumer({ groupId: 'analytic-service' });


const connectKafka = async () => {
    await consumer.connect()
    console.log('Analytic Service Kafka Connected');

    await consumer.subscribe({ topic: 'order-created', fromBeginning: true });
    await consumer.subscribe({ topic: 'payment-processed', fromBeginning: true });
    await consumer.subscribe({ topic: 'email-successful', fromBeginning: true });

    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            const data = JSON.parse(message.value.toString());
            console.log(`ANALYTIC EVENT [${topic}]:`, data);

            const event = new EventLog({
                eventType: topic,
                payload: data
            });
            await event.save();
            console.log('Analytics Event Saved');


        }
    })

}


module.exports = { connectKafka };
