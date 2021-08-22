require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { connect } = require('./src/db/db');
const app = express();
const session = require('express-session')
const MongoStore = require('connect-mongo')
const authRouter = require('./src/routes/authRouter');
const fileRouter = require('./src/routes/fileRouter');
const errorMiddleware = require('./src/middlewars/error-middleware');
const {dbConnectionURL} = require('./src/db/config')
const checkAuth = require('./src/middlewars/checkAuth')

const { PORT, COOKIE_NAME, COOKIE_SECRET } = process.env;

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.set('cookieName', COOKIE_NAME)
app.use(session({
  name: app.get('cookieName'),
  secret: COOKIE_SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: dbConnectionURL,
  }),
  cookie: {
    secure: false,
    httpOnly: true,
    maxAge: 1e3 * 86400, 
  },
}))

app.use(express.json());
app.use(cookieParser());

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/files',checkAuth, fileRouter)

app.use(errorMiddleware);

const start = async () => {
  try {
    await connect();
    app.listen(PORT, () => console.log(`Server has been started on PORT: ${PORT} `));
  } catch (e) {
    console.log(e);
  }
};

start();
