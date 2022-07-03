import express from 'express';
import { registerWithEureka } from './eureka-helper.js';

const app = express();
const PORT = 3000;

app.listen(PORT, () => {
  console.log("user-service on 3000");
  registerWithEureka('userms', PORT);
})

app.get('/user', (req, res) => {
  // Valid the request host
  if (req.headers['x-forwarded-host'] == "localhost:8080") {
    res.json("I am user-service");
  } else {
    res.status(401).send('');
  }
})

