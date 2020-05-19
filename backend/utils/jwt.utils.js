// Imports
const jwt = require('jsonwebtoken');

const JWT_SIGN_SECRET = 'ULBD8Qxg63e3Y5aX72tBQTraKmJS4IBI';
// Exported functions
module.exports = {
    generateTokenForUser: (userData) => {
        return jwt.sign({
            userId: userData.id,
            isAdmin: userData.isAdmin
        },
        JWT_SIGN_SECRET,
        {
            expiresIn: '240h'
        })
    }
};