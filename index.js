const express = require('express')
require('dotenv').config()
const { MongoClient } = require('mongodb');
const cors = require('cors');
const app = express()
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.qimng.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
// console.log(uri);
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


async function run() {
    try {
        await client.connect();
        // console.log('data base Connected');
        const database = client.db('BDtrabel');
        const userCollection = database.collection("services")
        //GET API

        app.get('/services', async (req, res) => {
            const cursor = userCollection.find({})
            const services = await cursor.toArray()
            res.send(services);
        })



        // POST API
        app.post('/services', async (req, res) => {
            const service = req.body
            console.log('Hit the post api', service);

            const result = await userCollection.insertOne(service);
            console.log(result);
            // console.log(`A document was inserted with the _id: ${result.insertedId}`);

            res.json(result)
        })


    }
    finally {
        // await client.close()
    }

}
run().catch(console.dir)

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/hello', (req, res) => {
    res.send('updated here')
})

app.listen(port, () => {
    console.log('port is', port)
})