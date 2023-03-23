'use strict';

module.exports = (sequelize, DataTypes) => {
  const data_product = sequelize.define("data_product", {
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    product_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Product name cannot be empty.'
        }
      }
    },
    premium: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  })

  data_product.associate = (models) => {
  }

  return data_product;
};