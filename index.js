const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const mongodb = require('mongodb')
const { MongoClient, ServerApiVersion } = require('mongodb');
const UserRoutes = require('./Routes/UserRoutes')

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/auth', UserRoutes)

app.get('/', (req, res) =>{
    res.send("Hello DPI")
});

const uri = process.env.MONGODB_URL;

mongoose.connect(uri, {
    useNewUrlParser : true,
    useUnifiedTopology : true
}).then(()=>{
    console.log("Mongoose connected successfully");
}).catch((error)=>{
    console.log('Mongoose is not connected')
})
// ========= mongoose connect ==========


const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
});
 
const dataBase = async () =>{
    try {
        await client.connect();
        const database = await client.db('test');
        const users = await database.collection('dpi_users');
        const notice = await database.collection('Notice')

        app.get('/dpi-users', async (req, res) =>{
            const result = await users.find().toArray();
            res.send(result)
        });

        app.get('/notice', async (req, res) =>{
            const noticeResult = await notice.find().toArray();
            res.send(noticeResult);
        })

        app.delete('/dpi-users/:id', async (req, res) =>{
            const DataID = req.params.id;

            const user = await users.deleteOne({ _id : new mongodb.ObjectId(DataID)})
            res.send(user);
        });

        app.patch('/notice/:id', async(req, res) =>{
            const DataID = req.params.id; 

            const updateNotice = await notice.findOneAndUpdate({ _id : new mongodb.ObjectId(DataID)}, {
                $set : {
                    tagline : req.body.tagline,
                    notice1 : req.body.notice1,
                    notice2 : req.body.notice2,
                    notice3 : req.body.notice3
                }
            });

            res.send(updateNotice); 
        })
    } catch (error) {   
        
    }
}
dataBase();

app.listen(process.env.PORT || 4030, (req, res) =>{
    console.log('DPI Server is running')
})