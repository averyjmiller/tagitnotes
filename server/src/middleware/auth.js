import jwt from 'jsonwebtoken';

function signToken(user) {
    return jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET,
        { expiresIn: "3d" }
    );
}

export default { signToken };