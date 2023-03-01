const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class User extends Model {}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
          }, // id
          
          username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
          }, // username
      
          email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
              isEmail: true,
            }, // validate
          }, // email
      
          password: {
            type: DataTypes.STRING,
            allowNull: false,
          }, // password
    }, // end of columns
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'user',
      } // sequelize
); // User.init()

module.exports = User;