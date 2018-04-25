import { 
  addContact, 
  getContacts, 
  getContact 
} from '../controllers/crmController'

// because we are using the router object
// we need to get the path to this route with
// "req.baseUrl". 
// "req.url" is "/" as defined in the router
// in index.js this endpoint will be defined as '/contacts'
// e.g.
// import contactRoutes from './routes/contactRoutes';
// app.use('/contacts', contactRoutes);

export default (router) => {
  router.route('/')
    .get(getContacts) // getContacts returns all contacts 
    .post(addContact) // addContact adds the resource to the db and will respond to the user
    
    // we can also pass the functions as second callbacks to the .get, .post methods
    // e.g. 
    // .get((req, res) => {
    //   console.log(`GET request on ${req.baseUrl}`);
    //   res.send(`GET request on ${req.baseUrl}`);
    // },
    // getContacts);


    // use this to test the /contacts endpoint without db stuff
    // // .get((req, res) => {
    //   console.log(`GET request on ${req.baseUrl}`);
    //   res.send(`GET request on ${req.baseUrl}`);
    // })
    // .post((req, res) => {
    //   console.log('body: ', req.body);
    //   console.log('req: ', req);
    //   console.log(`POST request on ${req.baseUrl}`);
    //   res.json(req.body);
    // })
    
  router.route('/:id') 
    .get(getContact) // getContact will take the id from the params and retrieve user from db if they exist 
    .put((req, res) => {
      console.log(`PUT request for id ${req.params.id} on ${req.baseUrl}`);
      res.send(`PUT request for id ${req.params.id} on ${req.baseUrl}`);
    })
    .delete((req, res) => {
      console.log(`DELETE request for id ${req.params.id} on ${req.baseUrl}`);
      res.send(`DELETE request for id ${req.params.id} on ${req.baseUrl}`);
    });

  return router;
};