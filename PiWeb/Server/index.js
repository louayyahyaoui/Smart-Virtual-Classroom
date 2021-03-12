import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import testRouter from './Routes/test.js';


const CONNECTION_URL= 'mongodb://localhost/test';
const app = express();

app.use(bodyParser.json({limit:"30mb",extended:true}));
app.use(bodyParser.urlencoded({limit:"30mb",extended:true}));
app.use(cors());

mongoose.connect(CONNECTION_URL,{ useNewUrlParser: true , useUnifiedTopology: true });
mongoose.connection.once('open', ()=>{
    console.log('connection has been made');

}).on('error',(error)=>{
console.log('error is',error);
}
);
app.listen(5000);
app.use('/test',testRouter);



