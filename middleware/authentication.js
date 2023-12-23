const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const  jwtKey  = process.env.jwtKey;

module.exports = async (req, res, next) => {
    const { authorize } = req.headers;

    if (!authorize) {
        return res.json({ error: 'You need to log in' });
    } else {
        const token = authorize.replace('Bearer ', '');

        try {
            const payload = jwt.verify(token, jwtKey);
            
            if (!payload || !payload._id) {
                return res.json({ error: 'Invalid token' });
            }

            const { _id } = payload;
            const userData = await User.findById(_id);

            req.user = userData
            next();
        } catch (err) {
            console.error(err);
            res.json({ error: 'You need to log in' });
        }
    }
};
