import mongoose from 'mongoose';
const Schema = mongoose.Schema;

// create and export the schema for the crmdb
// more about mongoose schemas: http://mongoosejs.com/docs/guide.html
// NOTE: types are not strings

// because we are passing this data as default on 'created_date, 
// we don't need to send the actual date to mongodb: mongo will create it for us on the database
// we can default any item on the schema by passing a value to the default key 
export default new Schema({
  firstName: {
    type: String,
    required: 'First name is required' // message returned if firstName is not sent
  },
  lastName: {
    type: String,
    required: 'Last name is required'
  },
  email: {
    type: String
  },
  company: {
    type: String
  },
  phone: {
    type: Number
  },
  created_date: {
    type: Date,
    default: Date.now 
  }
});