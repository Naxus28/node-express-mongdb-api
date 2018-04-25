import express from 'express';
import mongoose from 'mongoose';

import setMiddleware from './server/middleware/appMiddleware';
import errorHandlerMiddleware from './server/middleware/errorHandlerMiddleware';
import contactsRoutes from './server/routes/contactsRoutes';

const app = express();
const router = express.Router();
const PORT = 3000;

// Use the database url that corresponds to your environment and host
// This is the local database url
// Mongoose will create the db for us if it doesn't exist
// The "connect" function returns a promise, which is useful to handle errors
mongoose.connect('mongodb://localhost/CRMdb')
.then(
  () => console.log('mongoose connected'),
  err => console.log(`error on mongoose connection ${err}`),
);

setMiddleware(app);

app.use('/contacts', contactsRoutes(router));

errorHandlerMiddleware(app);

app.listen(PORT, () => console.log('Server listening on http://localhost:3000'));