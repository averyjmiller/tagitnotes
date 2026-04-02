import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import db from './config/connection.js';
import { userRoutes, noteRoutes } from './routes/index.js';

const app = express();

app.use(cors());
app.use(express.json());

// Middleware logging
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.get('/', (req, res) => res.send('Tag-it Notes backend running'));

app.use('/api/user', userRoutes);
app.use('/api/note', noteRoutes);

const PORT = process.env.PORT || 5000;

db.once('open', () => {
  console.log(`[CONNECTED] DB connection established`)
  app.listen(PORT, () => {
    console.log(`[CONNECTED] Server running on port ${PORT}`);
  });
});

db.on('error', (err) => {
  console.error('[ERROR] MongoDB error:', err);
});