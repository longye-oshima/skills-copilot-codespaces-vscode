// Create web server
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { MongoClient } = require('mongodb');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri);

async function main() {
    await client.connect();
    console.log("Connected to MongoDB");
}
main().catch(console.error);

// API routes
app.post('/comments', async (req, res) => {
    const comment = req.body;
    const db = client.db('commentsDB');
    const collection = db.collection('comments');

    try {
        const result = await collection.insertOne(comment);
        res.status(201).send(result);
    } catch (error) {
        res.status(500).send(error);
    }
});