import express from 'express';
import cors from 'cors';

import UserRouter from './routes/UserRoutes';
import BookingRouter from './routes/BookingRoutes';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

app.use('/users', UserRouter);
app.use('/booking', BookingRouter);

export const server = app.listen(PORT, () => console.log(`Running on port ${PORT}`));
export default app;