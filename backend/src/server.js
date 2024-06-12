import express from 'express';
import cors from 'cors';

import gameRoutes from './routes/game.routes.js';

const app = express();
const PORT = 3000;

app.use(cors());

app.use('/admin/game', gameRoutes);

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
