import { Router } from "express";
import * as users from '../services/UserServices';

const UserRouter = Router();

UserRouter.get('/', (_, res) => {
  return res.send(users.getAll());
})

UserRouter.get('/:id', (req, res) => {
  return res.send(users.getOne(Number(req.params.id)));
})

UserRouter.post('/', (req, res) => {
  return res.json(users.create(req.body));
});

export default UserRouter;