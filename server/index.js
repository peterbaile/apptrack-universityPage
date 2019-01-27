const fs = require('fs');
const rawdata = fs.readFileSync('../config.json');
const data = JSON.parse(rawdata);
const dbName = data.dbName;
const dbPassword = data.dbPassword;

const express = require('express');
const app = express();
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const cors = require('cors');

const port = process.env.PORT || 3001;

// url from the mongoDB 
// const MONGO_URL = "mongodb://localhost:27017/test";
const MONGO_URL = `mongodb://${dbName}:${dbPassword}@ds113765.mlab.com:13765/university`;

// allow cross-origin request
app.use(cors());

app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true
}));

app.listen(port, () => {
    console.log(`----Listening to port ${port}----`);
});

app.get('/', (req, res) => {
    res.redirect('./graphql');
});

mongoose.connect(MONGO_URL, { useNewUrlParser: true });
mongoose.connection
.once("open", () => console.log("----Connected to database----"));
