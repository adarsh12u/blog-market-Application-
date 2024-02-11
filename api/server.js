import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user.js';
import authRoutes from './routes/auth.js';
import postRoutes from './routes/post.js';
import commentRoutes from './routes/comment.js';
import cookieParser from 'cookie-parser';
import cors from 'cors'
import path from 'path';

dotenv.config();

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log('MongoDb is connected');
  })
  .catch((err) => {
    console.log(err);
  });

const __dirname = path.resolve();

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
   // Replace with your frontend's URL
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE", // Specify the HTTP methods you want to allow
  credentials: true,
}))


app.use(express.urlencoded({ extended: true }));
// app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.listen(3000, () => {
  console.log('Server is running on port 3000!');
});

app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/post', postRoutes);
app.use('/api/comment', commentRoutes);

app.use(express.static(path.join(__dirname, '/frontend/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'dist', 'index.html'));
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});