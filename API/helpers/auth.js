import jwt from 'jsonwebtoken';
import { User } from '../schemas/User.js';

const jwtSecret = 'verysecret';

export const generateAuthToken = (userId, role) => {
    return jwt.sign({ userId, role }, jwtSecret);
}

export const decryptToken = (token) => {
    return jwt.verify(token, jwtSecret);
}

export const isAuthorizedMiddleware = async (req, res, next) => {
    const token = req.headers.authorization;
    if(!token){
        res.status(403).send("Forbidden...");
        return;
    }

    const payload = decryptToken(token);
    const userId = payload.userId;

    const user = await User.findById(userId);
    req.user = user;

    next();
}

export const isAdmin = async (req, res, next) => {
    if (req.user.role !== "Admin") {
        res.status(403).send("Forbidden.");
        return;
    }
    next();
};