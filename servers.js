const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");

const app = express();   // ✅ first create app

app.use(cors());         // ✅ then use cors
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);

let collection;

// connect once
async function connectDB() {
    await client.connect();
    const db = client.db("farewellDB");
    collection = db.collection("registrations");
    console.log("✅ Database connected");
}
connectDB();

// API to save form data
app.post("/register", async (req, res) => {
    const data = req.body;
    data.timestamp = new Date();

    await collection.insertOne(data);

    res.send("Registration Successful 🎉");
});

// API to get users
app.get("/users", async (req, res) => {
    const users = await collection.find().toArray();
    res.json(users);
});
app.get("/", (req, res) => {
    res.send("🎉 CSE Farewell Server is Running!");
});

const PORT = process.env.PORT || 3000;

listen(PORT, () => {
    console.log("Server running on port " + PORT);
});
