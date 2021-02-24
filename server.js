const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('mongodb').MongoClient;
const app = express();
const cors = require('cors');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cors());
let url = 'mongodb+srv://sagar:sagar@cluster0.xlv2b.mongodb.net/pin_auth?retryWrites=true&w=majority';

app.get('/verify-number', async(req, res) => {
    const client = await mongodb.connect(url, {
        useUnifiedTopology: true
    }).catch((err) => {
        console.log(err)
    })

    if (!client) {
        console.log('error')
    }

    try {
        const db = client.db("pin_auth")
        const collection = db.collection("verifyNumber")
        const rest = await collection.find({}).toArray()
        res.send(rest)
        
    } catch (err) {
        return err
        // console.log(err)
    } finally {
        client.close()
    }
})


app.listen(process.env.PORT,() => console.log('Server listening'))
