import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        validate: [
            {
            validator: async function(v) {
                const existing = await mongoose.models.User.findOne({ email: v });
                return (!existing || existing._id.toString() === this._id.toString());
            },
            message: 'Email already exists'
        }],
        required: [true, 'Email cannot be blank'],
        unique: true,
        trim: true,
        match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please enter a valid email'],
        minLength: [5, 'Email cannot be less than 5 characters'],
        maxLength: [254, 'Email cannot be more than 254 characets']
    },
    password: {
        type: String,
        required: [true, 'Password cannot be blank'],
        minLength: [6, 'Password must be at least 6 characters'],
        maxLength: [100, 'Password cannot be more than 100 characters'],
        select: false
    },
    firstName: {
        type: String,
        required: [true, 'First name cannot be blank'],
        trim: true,
        minLength: [1, 'First name must be at least 1 character'],
        maxLength: [20, 'First name cannot be more than 20 characters']
    },
    lastName: {
        type: String,
        required: [true, 'Last name cannot be blank'],
        trim: true,
        minLength: [1, 'Last name must be at least 1 character'],
        maxLength: [20, 'Last name cannot be more than 20 characters']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

UserSchema.pre('save', async function() {
    if(!this.isModified('password')) return;

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

export default mongoose.model('User', UserSchema);