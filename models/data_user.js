'use strict';
module.exports = (sequelize, DataTypes) => {
  const data_user = sequelize.define("data_user", {
    user_id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      unique: true,
    },
    user_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Username cannot be empty.'
        }
      }
    },
    active: {
      type: DataTypes.INTEGER,
      allowNull: true,
    }
  })

  data_user.associate = (models) => {
  }

  return data_user;
};