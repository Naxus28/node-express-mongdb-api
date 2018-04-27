import express from 'express';
import morgan from 'morgan';

export default (app) => {
  app.use(morgan('dev'));
  app.use(express.urlencoded({ extended: true })); // extended: true  allows posting nested objects
  app.use(express.json());
};
