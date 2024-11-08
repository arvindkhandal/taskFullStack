const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');
const app = express();

app.use(express.json());
app.use(cors());

const mongoUri = 'mongodb+srv://arvindkhandal9509:j6xeGa9pI7bXeZBM@cluster0.74xlh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

let db, userCollection;

const connect = async () => {
    if (!userCollection) {
        try {
            const client = new MongoClient(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });
            await client.connect();
            console.log("Connected to Db");
            db = client.db("sample_mflix");
            userCollection = db.collection("loginTask");
        } catch (err) {
            console.error("Database connection error:", err);
        }
    }
    return userCollection;
};

async function insertUser(username, password) {
    try {
        const collection = await connect();
        return await collection.insertOne({ name: username, password });
    } catch (err) {
        console.err("Error inserting user:", err);
    }
}

async function findUser(username, password) {
    try {
        const collection = await connect();
        return await collection.findOne({ name: username, password });
    } catch (err) {
        console.error("Error finding user:", err);
    }
}

app.post('/signup', async (req, res) => {
    const { username, password } = req.body;
    if (username && password) {
        try {
            await insertUser(username, password);
            res.status(201).json({ message: "User created successfully" });
        } catch (err) {
            res.status(500).json({ message: "Error creating user", err: err.message });
        }
    } else {
        res.status(400).json({ message: "Username and password are required" });
    }
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    if (username && password) {
        try {
            const user = await findUser(username, password);
            if (user) {
                res.status(200).json({ message: "User login successful" });
            } else {
                res.status(401).json({ message: "Invalid username or password" });
            }
        } catch (err) {
            res.status(500).json({ message: "Error logging in", err: err.message });
        }
    } else {
        res.status(400).json({ message: "Username and password are required" });
    }
});

app.listen(3001, () => {
    console.log("Server running on port 3001");
});
