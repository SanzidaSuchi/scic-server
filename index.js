const express = require("express");
// const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectId;




const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.oyinl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const port = 5000;
const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req,res) =>{
  res.send("Hello World");
});

client.connect(err => {
    client.connect();
    console.log("database connected successfully");
    const database = client.db('scicUser');
   
    /* All collection */
    const servicesCollection = database.collection('services');
    const ordersCollection = database.collection('orders');
    const reviewCollection = database.collection("review");
    const usersCollection = database.collection("users");


    app.get('/services', async (req, res) => {
        const cursor = servicesCollection.find({});
        const services = await cursor.toArray();
        res.send(services);
    });


});
    
app.listen(process.env.PORT || port);
