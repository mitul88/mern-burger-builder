
const app = require('./app');

const mongoose = require('mongoose');

const dotenv = require('dotenv');
dotenv.config();

mongoose.connect(process.env.MONGODB_SERVER)
.then(() => console.log("connected to mongo db"))
.catch(err=> console.log(err));

const port = process.env.PORT || 3001;

app.listen(port, ()=> {
    console.log(`Listening on port ${port}`);
})