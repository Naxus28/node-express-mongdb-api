import express from 'express';
import morgan from 'morgan';

export default (app) => {
  app.use(morgan('dev'));
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
};
