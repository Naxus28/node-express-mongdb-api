import express from 'express';
import mongoose from 'mongoose';

const app = express();
const router = express.Router();
const PORT = 3000;

// use the database url that corresponds to your environment and host
// this is the local database url
// the "connect" function returns a promise, which is useful to handle errors
mongoose.connect('mongodb://localhost/CRMdb')
.then(
  () => console.log('mongoose connected'),
  err => console.log(`error on mongoose connection${err}`),
);

import setMiddleware from './server/middleware/appMiddleware';
import contactsRoutes from './server/routes/contactsRoutes';

setMiddleware(app);
app.use('/contacts', contactsRoutes(router));

app.listen(PORT, () => console.log('Server listening on http://localhost:3000'));