const sequelize = require('./db');
const Admin = require('./models/Admin');
const bcrypt = require('bcryptjs');

async function seedAdmin() {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    
    const count = await Admin.count();
    if (count === 0) {
      const defaultEmail = process.env.ADMIN_EMAIL || 'admin@fourjective.com';
      const defaultPass = process.env.ADMIN_PASSWORD || 'admin123';
      const hashedPassword = await bcrypt.hash(defaultPass, 10);

      await Admin.create({
        email: defaultEmail,
        password: hashedPassword,
      });

      console.log(`[Seed] Created initial Admin account:`);
      console.log(`       Email:    ${defaultEmail}`);
      console.log(`       Password: ${defaultPass}`);
    } else {
      console.log(`[Seed] Admin user already exists (${count} account(s)).`);
    }
  } catch (error) {
    console.error('[Seed] Error seeding admin account:', error);
  }
}

seedAdmin();
