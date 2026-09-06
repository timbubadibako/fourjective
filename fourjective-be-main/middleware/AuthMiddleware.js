const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

module.exports = async (req, res, next) => {
    const authHeader = req.header('Authorization');

    // BYPASS MODE FOR TESTING: Jika ada token valid gunakan token, jika tidak gunakan mock admin
    if (authHeader) {
        try {
            const token = authHeader.replace('Bearer ', '');
            const decoded = jwt.verify(token, process.env.JWT_SECRET || 'super_secret_jwt_key_fourjective_2026');
            
            const admin = await Admin.findByPk(decoded.id, {
                attributes: { exclude: ['password'] }
            });

            if (admin) {
                req.admin = admin;
                return next();
            }
        } catch (ex) {
            // Ignore token error in bypass mode
        }
    }

    // Fallback Admin
    req.admin = { id: 1, email: 'admin@fourjective.com' };
    next();
};