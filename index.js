const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const { MongoClient, ServerApiVersion } = require('mongodb');
const port = process.env.PORT || 5000;


// Middleware

app.use(cors());
app.use(express.json())



const uri = `mongodb+srv://${process.env.dbUser}:${process.env.dbPassword}@cluster0.p6rgmv3.mongodb.net/?retryWrites=true&w=majority`;






const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});


async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();


        const portfolioCollection = client.db("my-portfolio").collection("portfolio");


        app.get('/portfolio', async (req, res) => {
            const result = await portfolioCollection.find().toArray();

            res.send(result);
        })







        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);



app.get('/', (req, res) => {
    res.send(' Copyright @ Rabby Hasan . This is for Rabby Hasan')
})


app.listen(port, () => {

    console.log(`My Portfolio Website listening on port ${port}`)
})