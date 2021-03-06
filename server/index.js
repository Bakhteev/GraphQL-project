const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const schema = require('./schema/schema')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()
const PORT = 5000

mongoose.connect(
  'mongodb+srv://bogdan:323694m@cluster0.xp8k2.mongodb.net/graphql?retryWrites=true&w=majority',
  { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: true }
)

app.use(cors())

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true,
  })
)



const dbConnection = mongoose.connection
dbConnection.on('error', (err) => console.log(`connection error: ${err}`))
dbConnection.once('open', () => console.log('connection to db!'))
app.listen(PORT, (err) =>
  err ? console.log(err) : console.log('server stated on PORT', PORT)
)
