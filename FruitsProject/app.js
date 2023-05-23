
//Conection made with MongoDB Driver

const { MongoClient } = require("mongodb");

const uri =
    "mongodb://127.0.0.1:27017";

const client = new MongoClient(uri);

async function run() {
    try {
        const database = client.db('fruitsDB');
        const fruits = database.collection('fruits');

        const list =
            [
                {
                    name: 'Apple',
                    score: 8,
                    review: 'Great fruit'
                },
                {
                    name: 'Orange',
                    score: 6,
                    review: 'Kinda sour'
                },
                {
                    name: 'Banana',
                    score: 9,
                    review: 'Great stuff!'
                }
            ];

        const options = { ordered: true };

        const result = await fruits.insertMany(list, options);

        console.log(`${result.insertedCount} fruits were inserted`);
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}
run().catch(console.dir);