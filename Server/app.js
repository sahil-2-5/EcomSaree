const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');

const connectDB = require('./config/db');

const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');

const errorHandler = require('./middlewares/errorHandler');
const { default: helmet } = require('helmet');

dotenv.config();
connectDB();

const port = process.env.PORT || 5000;

const app = express();
app.use(helmet());
app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));

const allowedOrigins = process.env.FRONTEND_URLS.split(",");
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

app.use(
  session({
    secret: process.env.SESSION_SECRET || 'defaultsecret',
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000, // 1 day
      secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
      httpOnly: true, // Prevent client-side JavaScript from accessing the cookie
    },  
  })
);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use('/user', userRoutes);
app.use('/admin', adminRoutes);

// 404 handler
app.use((req, res, next) => {
  res.status(404);
  const error = new Error(`Not Found - ${req.originalUrl}`);
  next(error);
});

app.use(errorHandler); 

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});