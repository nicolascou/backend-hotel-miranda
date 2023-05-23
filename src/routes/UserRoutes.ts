import { Router } from "express";
import * as users from '../services/UserService';
import { getUsers, getUserById, createUser, updateUser, deleteUser } from "../controllers/user.controller";

const UserRouter = Router();

UserRouter.get('/', getUsers);

UserRouter.get('/:id', getUserById);

UserRouter.post('/', createUser);

UserRouter.put('/:id', updateUser);

UserRouter.delete('/:id', deleteUser);

export default UserRouter;