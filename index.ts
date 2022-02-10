import express, { Request, Response, Application, NextFunction } from 'express';
import './src/connection'
import bodyParser from 'body-parser';
import * as dotenv from 'dotenv';
dotenv.config({ path: __dirname+'/.env' });

import utils, { Err, ERR_CODES } from './utils/utils';
import routes from './src/controller'

const app: Application = express();
app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request: Request, response: Response): void => {
  response.send();
});

app.use('/', routes);

app.use((err: Err, __req: Request, res: Response, __next: NextFunction) => {
  const code: any = err.code;
  const status = ERR_CODES[code];
  console.log(status, err);

  if (status) {
    return res.status(+status).json({ message: err.message }).end();
  }
  else {
    return res
      .status(utils.HTTP_INTERNAL_SERVER_ERROR_STATUS)
      .json({ message: 'Internal server error' }).end();
  }
});

app.listen(process.env.PORT,async () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
