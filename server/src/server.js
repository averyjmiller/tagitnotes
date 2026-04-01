import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import db from './config/connection.js';
import { userRoutes, noteRoutes } from './routes/index.js';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => res.send('Tag-it Notes backend running'));

app.use('/api/user', userRoutes);
app.use('/api/note', noteRoutes);

const PORT = process.env.PORT || 5000;

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`[CONNECTED] Server running on port ${PORT}`);
  });
});