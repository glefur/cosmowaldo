import express from 'express';
import cors from 'cors';

import gameRoutes from './routes/game.routes.js';
import gameSetupRoutes from './routes/gamesetup.routes.js';
import playerRoutes from './routes/player.routes.js';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Servir les fichiers statiques du dossier /assets
app.use('/assets', express.static('assets'));

app.use('/api/admin/game', gameRoutes);
app.use('/api/admin/initialize', gameSetupRoutes);
app.use('/api/player/', playerRoutes);

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
