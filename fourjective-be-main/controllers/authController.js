const Admin = require('../models/Admin');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
  const { email } = req.body;

  try {
    // BYPASS MODE FOR TESTING: Cari admin atau gunakan mock admin jika database kosong
    let admin = await Admin.findOne();
    if (!admin) {
      admin = { id: 1, email: email || 'admin@fourjective.com' };
    }

    const token = jwt.sign(
      { id: admin.id, email: admin.email },
      process.env.JWT_SECRET || 'super_secret_jwt_key_fourjective_2026',
      { expiresIn: '24h' }
    );

    res.json({ message: 'Login successful (Bypassed)', token });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Internal server error', error });
  }
};