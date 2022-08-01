import express from 'express';
import bodyParser from 'body-parser';

import todosRoutes from "./routes/todos";

const PORT = process.env.PORT || 5000;

const app = express();

app.use(bodyParser.json());

app.use(todosRoutes);

app.listen(PORT,() => {
  console.log("port:",PORT);
  console.log(`Client connected on port ${PORT}`);
})
