const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Profile extends Model {}

Profile.init(
    {   
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
          }, // id

          user_username: {
            type: DataTypes.STRING,
            allowNull: false,
          }, // username

          // profile_pic: {
          //   type: DataTypes.STRING,
          //   allowNull: true,
          // }, // profile_pic

          bio: {
            type: DataTypes.STRING,
            allowNull: true,
          }, // bio

          user_id: {
            type: DataTypes.INTEGER,
            references: {
              model: 'user',
              key: 'id',
            }, // references
          }, // user_id

    }, // end of columns
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'profile',
      } // sequelize
); // Profile.init()

module.exports = Profile;