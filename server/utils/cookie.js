import dotenv from 'dotenv';

dotenv.config();

export const cookieOptions = {
    sameSite: 'Strict',
    httpOnly: true,
    secure: true,
    maxAge: process.env.COOKIE_MAX_AGE || 1
};

export const authenticationCookieOptions = {
    sameSite: 'Strict',
    httpOnly: true,
    secure: true,
    signed: true,
    maxAge: process.env.COOKIE_MAX_AGE || 1
}