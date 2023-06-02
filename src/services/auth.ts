import passport from 'passport';
import { Strategy as localStrategy } from 'passport-local';
import { Strategy as JWTstrategy } from 'passport-jwt';
import { ExtractJwt } from 'passport-jwt';
import { db } from '../repositories/db';
import { RowDataPacket } from 'mysql2';
import bcrypt from 'bcrypt';

async function validUser(name: string, password: string) {
	const [ results ] = await db.promise().query<RowDataPacket[]>('SELECT username, password FROM users');
	for (const user of results) {
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
