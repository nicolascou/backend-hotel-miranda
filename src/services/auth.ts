import passport from 'passport';
import { Strategy as localStrategy } from 'passport-local';
import { Strategy as JWTstrategy } from 'passport-jwt';
import { ExtractJwt } from 'passport-jwt';
import bcrypt from 'bcrypt';
import { User } from '../repositories/db/models';
import { IUser } from '../models/types';

async function validUser(name: string, password: string) {
	const users: IUser[] = await User.find({});
	for (const user of users) {
		if (user.username === name && bcrypt.compareSync(password, user.password)) {
			return true;
		}
	}
	return false;
}

passport.use(
  'login',
  new localStrategy(
	{
  	usernameField: 'name',
  	passwordField: 'password'
	},
	async (name: string, password: string, done: any) => {
  	try {
			const isUser = await validUser(name, password);
    	if (isUser) {
        return done(null, {name}, { message: 'Logged in Successfully' });	 
      }
			return done(null, false, { message: 'Invalid credentials' });
  	} catch (error) {
    	return done(error);
  	}
	}
  )
);

passport.use(
  new JWTstrategy(
	{
  	secretOrKey: process.env.SECRET_KEY,
  	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
	},
	async (token, done) => {
  	try {
    	return done(null, token.user);
  	} catch (error) {
    	done(error);
  	}
	}
  )
);
