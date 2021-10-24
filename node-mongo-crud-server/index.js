// firstmongodbuser
// y2yxiH2pg2MEGQrX

const { MongoClient } = require('mongodb');
const express = require('express')
const cors = require('cors')
const app = express()
const port = process.env.PORT || 5000
const ObjectId = require('mongodb').ObjectId

app.use(cors())
app.use(express.json())

const uri = "mongodb+srv://firstmongodbuser:y2yxiH2pg2MEGQrX@cluster0.z46cs.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
   try{
      await client.connect()

      const database = client.db('foodMaster')
      const usersCollection = database.collection('user')

      //GET API
      app.get('/users', async (req, res) => {
         const cursor = usersCollection.find({})
         const users = await cursor.toArray(cursor)
         res.send(users)
      })

      app.get('/users/:id', async (req, res) => {
         const id = req.params.id
         const query = { _id: ObjectId(id) }
         const user = await usersCollection.findOne(query)
         console.log('Hitting the api for the id:' , id)
         console.log('Responded as: ', user)
         res.send(user)
      })

      // POST API
      app.post('/users', async(req, res) => {
         const newUser = req.body
         const result = await usersCollection.insertOne(newUser)
         console.log('Hitting the post for ', req.body)
         console.log(result)
         res.send(result)
      })

      //DELETE API
      app.delete('/users/:id', async (req, res) => {
         const id = req.params.id
         const query = { _id: ObjectId(id) }
         const result = await usersCollection.deleteOne(query)
         console.log(`User is removed where Id '${req.params.id}' does belong.`)
         res.send(result)
      })

      //UPDATE API
      app.put('/users/:id', async (req, res) => {
         const id = req.params.id
         const updatedUser = req.body
         const filter = {_id: ObjectId(id)}
         const options = { upsert: true };
         const updateDoc = {
            $set: {
              name: updatedUser.name,
              email: updatedUser.email
            },
          };
         const result = await usersCollection.updateOne(filter, updateDoc, options)
         console.log('This API is got hitted for id: ', id)
         res.json(result)
      })
      
      // console.log('A user is sent to database.')
   } finally{
      // await client.close()
   }
}

run().catch(console.dir)

app.get('/', (req, res) => {
   res.send('This is OK!')
})

app.listen(port, () => {
   console.log('this server is running on por ', port)
})