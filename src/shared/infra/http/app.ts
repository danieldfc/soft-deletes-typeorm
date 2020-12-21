import express from 'express';
import routes from './routes';

import '@shared/infra/typeorm';

const app = express();

app.use(routes);

export default app;
