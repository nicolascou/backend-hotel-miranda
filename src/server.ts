import express from 'express';
import cors from 'cors';

import UserRouter from './routes/UserRoutes';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

// app.use('/login')
app.use('/users', UserRouter);

export const server = app.listen(PORT, () => console.log(`Running on port ${PORT}`));
export default app;