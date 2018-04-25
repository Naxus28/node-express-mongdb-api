import mongoose from 'mongoose';
import ContactSchema from '../models/crmModel.js';

// create the Contact collection that will be saved to the DB
// with the schema that was created in the "model" file
const Contact = mongoose.model('Contact', ContactSchema);


/* the exported function below is the controller that will add the resource to the DB
* we will import it in the "routes" file and use it in the
* "post" route so we can save the data sent via the post request into the db
* We will replace the whole callback of the "post" request with the 
* function below
* e.g. 
* 
* import addContact from '../controllers/crmController'
* app.post(addContact);
*/

// adds new contact
const addContact = (req, res) => {
  // create the new contact
  // express.json and express.urlencode will parse the body sent from the client into json data
  let newContact = new Contact(req.body);  

  // mongoose "save" method will save the resource to the DB
  // it passes an error and the resource in the constructor above
  // back to the callback
  newContact.save((err, contact) => {
    if (err) {
      // send the error to the client
      // res.send finishes the connection so we dont need to use "else" below 
      res.send(err);
    }

    // if there are no errors, send the resource just created on the DB back to the client
    res.json(contact);
  });
};

// gets all contacts
const getContacts = (req, res) => {
  // the first param can take take arguments to
  // find specific items in the db
  // in this case we want all users so we don't need to specify an id 
  // or any other identifier that we have on the contact object 
  // (whatever we defined on the schema--firstName, lastName, etc--could be used to filter the object)
  Contact.find({}, (err, contact) => {
    if (err) {
      res.send(err);
    }

    res.json(contact);
  });
};

// gets contact by id 
// (copy id string from mongodb obj--use robomongo. Should be something like this: ObjectId("5adfd44ed95bea22ea1a5929"))
const getContact = (req, res) => {
  // mongoose and mongo provide a findById function
  Contact.findById(req.params.id, (err, contact) => {
    if (err) {
      res.send(err);
    }

    res.json(contact);
  });
};

// update contact
const updateContact = (req, res) => {
  // findOneAndUpdate takes the id (as key/valu pair), the object to update, 
  // and another optional object where we can specify we want it to return the new data
  // not the old
  Contact.findOneAndUpdate({_id: req.params.id}, req.body, { new: true }, (err, contact) => {
    if (err) {
      res.send(err);
    }

    res.json(contact);
  });
};

// delete contact
const deleteContact = (req, res) => {
  // findOneAndUpdate takes the id (as key/valu pair), the object to update, 
  // and another optional object where we can specify we want it to return the new data
  // not the old
  Contact.remove({_id: req.params.id}, (err, contact) => {
    if (err) {
      res.send(err);
    }

    res.json(contact);
  });
};



export {
  addContact,
  getContacts,
  getContact,
  updateContact,
  deleteContact
};


