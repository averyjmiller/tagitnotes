import User from '../models/User.js';
import signToken from '../middleware/auth.js';

export const signupUser = async (req, res) => {
    try {
        const user = await User.create(req.body);
        const token = signToken(user);
        res.status(201).json({ token });
    } catch(err) {
        console.error(err);

        if(err.name === 'ValidationError') {
            const message = Object.values(err.errors)
                .map(e => e.message)
                .join(', ');
            
            return res.status(400).json({ error: message });
        }

        if(err.code === 11000) {
            const field = Object.keys(err.keyValue)[0];
            return res.status(400).json({
                error: `${field} already exists`
            });
        }

        res.status(500).json({ error: 'Internal server error' });
    }
};

export const loginUser = async (req, res) => {

};

export const getUser = async (req, res) => {

};

export const updateUser = async (req, res) => {

};

export const deleteUser = async (req, res) => {

};