const userData = require('./userData.json');
const profileData = require('./profileData.json');
const { User, Profile } = require('../models');
const sequelize = require('../config/connection');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  // create users
  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  // create profiles
  await Profile.bulkCreate(
    profileData.map((profile, index) => ({
      ...profile,
      user_id: users[index].id,
    }))
  );

  process.exit(0);
};

seedDatabase();
