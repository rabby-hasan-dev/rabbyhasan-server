import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import globalErrorHandler from './app/middlewares/globalErrorhandler';
import notFound from './app/middlewares/notFound';
import router from './app/routes';

const app: Application = express();
// const io = socketIo(app);

//parsers
app.use(express.json());
app.use(cookieParser());

// app.use(cors());
app.use(cors({ origin: ['http://localhost:3000'], credentials: true }));

// application routes
app.use('/api/v1', router);

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to My Portfolio Backend World');
});

app.use(async (req, res, next) => {
  // console.log(req);

  next();
});

app.use(globalErrorHandler);

//Not Found
app.use(notFound);

// Setup Socket.IO
// socketHandler(io);

export default app;
