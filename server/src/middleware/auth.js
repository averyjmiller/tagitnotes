import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const signToken = (user) => {
    return jwt.sign(
        { _id: user._id },
        process.env.JWT_SECRET,
        { expiresIn: "3d" }
    );
}

export const protect = async (req, res, next) => {
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    if(!token) {
        return res.status(401).json({ error: 'Not authorized, token missing' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded._id);

        if(!req.user) {
            return res.status(404).json({ error: 'No user found with this token' });
        }

        next();
    } catch (err) {
        if(err.name === 'TokenExpiredError') {
            return res.status(401).json({ error: 'Token expired, please log in again' });
        }

        if(err.name === 'JsonWebTokenError') {
            return res.status(401).json({ error: 'Invalid token, authorization denied' });
        }

        return res.status(500).json({ message: 'Internal server error', error: err.message });
    }
}