import bcrypt from 'bcrypt';
import User from '../models/User.js';
import { signToken } from '../middleware/auth.js';

function safeUser(user) {
    const { password, ...safeUser } = user.toObject();
    return safeUser;
}

export const signupUser = async (req, res) => {
    try {
        const user = await User.create(req.body);
        const token = signToken(user);
        res.status(201).json({
            success: true,
            message: 'Account has been created',
            user: safeUser(user),
            token
        });
    } catch(err) {
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

        return res.status(500).json({ 
            message: 'Internal server error', 
            error: err.message 
        });
    }
};

export const loginUser = async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username }).select("+password");

        if(!user) {
            return res.status(400).json({ error: 'Username or password is incorrect' });
        }

        const isMatch = await bcrypt.compare(req.body.password, user.password);

        if(!isMatch) {
            return res.status(400).json({ error: 'Username or password is incorrect' });
        }

        const token = signToken(user);
        res.status(200).json({
            success: true,
            message: 'User is logged in',
            user: safeUser(user),
            token
        });
    } catch(err) {
        return res.status(500).json({ 
            message: 'Internal server error', 
            error: err.message 
        });
    }
};

export const getUserDetails = async (req, res) => {
    try {
        const user = await User.findById(req.body._id);

        if(!user) {
            return res.status(400).json({ error: 'Unable to find user' });
        }

        return res.status(200).json({
            success: true,
            message: 'Found user details',
            user: safeUser(user)
        });
    } catch(err) {
        return res.status(500).json({ 
            message: 'Internal server error', 
            error: err.message 
        });
    }
};

export const updateUserDetails = async (req, res) => {
    try {
        const user = await User.findById(req.body._id).select("+password");

        if(!user) {
            return res.status(400).json({ error: 'Unable to find user' });
        }

        const {
            username,
            email,
            password,
            firstName,
            lastName
        } = req.body;

        if(
            (username  === undefined || !username.trim())  &&
            (email     === undefined || !email.trim())     &&
            (password  === undefined || !password.trim())  &&
            (firstName === undefined || !firstName.trim()) &&
            (lastName  === undefined || !lastName.trim())
        ) return res.status(400).json({ error: 'Parameters are undefined' });

        if(username !== undefined && username.trim()) {
            user.username = username;
        }

        if(email !== undefined && email.trim()) {
            user.email = email;
        }

        if(password !== undefined && password.trim()) {
            const isMatch = await bcrypt.compare(password, user.password);

            if(isMatch) {
                return res.status(400).json({ error: 'Cannot reuse the same password' });
            }

            user.password = password;
        }

        if(firstName !== undefined && firstName.trim()) {
            user.firstName = firstName;
        }

        if(lastName !== undefined && lastName.trim()) {
            user.lastName = lastName;
        }

        await user.save();

        return res.status(200).json({
            success: true,
            message: 'Updated user details',
            user: safeUser(user)
        });
    } catch(err) {
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

        return res.status(500).json({ 
            message: 'Internal server error', 
            error: err.message 
        });
    }
};

export const deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.body._id);

        if(!user) {
            return res.status(400).json({ error: 'Unable to find user' });
        }

        await User.deleteOne({ _id: req.body._id });

        res.status(200).json({
            success: true,
            message: 'User has been deleted',
            user: safeUser(user)
        });
    } catch(err) {
        return res.status(500).json({ 
            message: 'Internal server error', 
            error: err.message 
        });
    }
};