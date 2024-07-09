import express from 'express';
import cors from 'cors';

import gameMasterRoutes from './routes/game.master.routes.js';
import gameRunRoutes from './routes/game.run.routes.js';
import gameSetupRoutes from './routes/gamesetup.routes.js';
import playerRoutes from './routes/player.routes.js';
import adminRoutes from './routes/admin.routes.js';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Servir les fichiers statiques du dossier /assets
app.use('/assets', express.static('assets'));

app.use('/api/admin/user', adminRoutes);
app.use('/api/admin/game', gameMasterRoutes);
app.use('/api/admin/initialize', gameSetupRoutes);
app.use('/api/player/', playerRoutes);
app.use('/api/game', gameRunRoutes);

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
