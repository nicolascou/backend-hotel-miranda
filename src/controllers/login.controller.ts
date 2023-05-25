import { Request, Response, NextFunction, Router } from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

interface UserToken {
  _id: string;
  email: string;
}

const loginRouter = Router()

const login = async (req: Request, res: Response, next: NextFunction) => {
	passport.authenticate(
  	'login',
  	async (err: any, user: UserToken) => {
    	try {
      	if (err || !user) {
        	const error = new Error('An error occurred.');

        	return next(error);
      	}

      	req.login(
        	user,
        	{ session: false },
        	async (error) => {
          	if (error) return next(error);

          	const body = { _id: user._id, email: user.email };
          	const token = jwt.sign({ user: body }, process.env.SECRET_KEY!);

          	return res.json({ token });
        	}
      	);
    	} catch (error) {
      	return next(error);
    	}
  	}
	)(req, res, next);
};

loginRouter.post('/', login);

export default loginRouter;
