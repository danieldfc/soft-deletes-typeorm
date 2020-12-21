import 'reflect-metadata';
import 'dotenv/config';

import express, { NextFunction, Request, Response } from 'express';

import AppError from '@shared/errors/AppError';

import '@shared/container';
import '@shared/infra/typeorm';

import routes from './routes';

const app = express();

app.use(express.json());
app.use(routes);

app.use(
  async (err: Error, request: Request, response: Response, _: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        status: 'error',
        message: err.message,
      });
    }

    console.log(err.message);

    return response.status(500).json({
      status: 'error',
      message: 'Internal Server Error',
    });
  },
);

export default app;
