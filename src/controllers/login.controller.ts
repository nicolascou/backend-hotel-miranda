import { Request, Response, NextFunction } from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';

interface UserToken {
  _id: string;
  email: string;
}

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
          	const token = jwt.sign({ user: body }, 'cambiame');

          	return res.json({ token });
        	}
      	);
    	} catch (error) {
      	return next(error);
    	}
  	}
	)(req, res, next);
};

export default login;
