const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { MongoClient, ServerApiVersion, MongoRuntimeError } = require("mongodb");

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri =
  `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.dlspc1u.mongodb.net/?retryWrites=true&w=majority`;

//   console.log(uri);
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
    try{
        await client.connect();
        // console.log('database connection');
        const serviceCollection = client.db('doctor_portal').collection('services');


        app.get('/service',async(req,res)=>{
            const query={};
            const cursor=serviceCollection.find(query);
            const services=await cursor.toArray();
            res.send(services);
        })

    }
    finally{

    }
}

run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Hello doctor portal server site");
});

app.listen(port, () => {
  console.log(`Doctor portal app listening on port ${port}`);
});
