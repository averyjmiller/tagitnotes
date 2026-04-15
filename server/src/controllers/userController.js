import bcrypt from 'bcrypt';
import User from '../models/User.js';
import { signToken } from '../middleware/auth.js';
import Note from '../models/Note.js';

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
        const { email, password } = req.body;

        if(!email || !password) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const user = await User.findOne({ email: email }).select("+password");

        if(!user) {
            return res.status(400).json({ error: 'Email or password is incorrect' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch) {
            return res.status(400).json({ error: 'Email or password is incorrect' });
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
        const { user } = req;

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
        const { user } = req;
        const {
            email,
            password,
            firstName,
            lastName
        } = req.body;

        if(!email && !password && !firstName && !lastName) {
            return res.status(400).json({ error: 'Parameters are undefined' });
        }

        user.email = email ? email : user.email;
        user.firstName = firstName ? firstName : user.firstName;
        user.lastName = lastName ? lastName : user.lastName;

        if(password) {
            const userWithPass = await User.findById(user._id).select("+password");
            const oldPassword = userWithPass.password;
            const isMatch = await bcrypt.compare(password, oldPassword);

            if(isMatch) {
                return res.status(400).json({ error: 'Cannot reuse the same password' });
            }

            user.password = password;
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
        const { user } = req;

        await User.deleteOne({ _id: user._id });
        await Note.deleteMany({ author: user._id });

        res.status(200).json({
            success: true,
            message: 'User and associated notes have been deleted',
            user: safeUser(user)
        });
    } catch(err) {
        return res.status(500).json({ 
            message: 'Internal server error', 
            error: err.message 
        });
    }
};