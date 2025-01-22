import express from 'express';
import cors from 'cors';
import pino from 'pino';
import router from './routers/index.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { errorHandler } from './middlewares/errorHandler.js';
import cookieParser from 'cookie-parser';
import { UPLOAD_DIR } from './constans/index.js';
import { swaggerDocs } from './middlewares/swaggerDocs.js';

const logger = pino();
const app = express();

const corsOptions = {
  origin: ['http://localhost:5173', 'https://aqua-track-02-gr.vercel.app'],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', [
//     'http://localhost:5173',
//     'https://aqua-track-02-gr.vercel.app',
//   ]);
//   res.setHeader(
//     'Access-Control-Allow-Methods',
//     'GET,HEAD,PUT,PATCH,POST,DELETE',
//   );
//   res.setHeader('Cross-Origin-Opener-Policy', 'same-origin-allow-popups');
//   res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//   res.setHeader('Access-Control-Allow-Credentials', 'true');
//   next();
// });

app.use(express.json());
app.use(cookieParser());

app.use('/uploads', express.static(UPLOAD_DIR));
app.use('/api-docs', swaggerDocs());

// app.use((req, res, next) => {
//   res.removeHeader('Cross-Origin-Opener-Policy');
//   next();
// });

app.use((req, res, next) => {
  logger.info(`${req.method} ${req.url}`);
  next();
});

app.use(router);

app.use(notFoundHandler);

app.use(errorHandler);

const setupServer = () => {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

export default setupServer;
