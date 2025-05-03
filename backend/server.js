import express from 'express';
import cors from 'cors';
import todoRoutes from './routes/todoRoutes.js';
import 'dotenv/config';
import dbConnection from './dbConfig/dbConnection.js';
import helmet from 'helmet';


const app = express();
app.use(cors());
app.use(express.json());
app.use(helmet());

 app.use('/api/todo', todoRoutes);
const port=process.env.PORT;
console.log(port);

 dbConnection;

  app.listen(port,()=>{
    console.log( `Server Is Running On Port ${port}`);
  }
  )