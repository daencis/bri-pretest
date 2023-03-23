'use strict';

module.exports = (sequelize, DataTypes) => {
  const data_transaction = sequelize.define("data_transaction", {
    trans_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    trans_date: {
        type: DataTypes.DATE,
        allowNull: false,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'data_product',
            key: 'product_id'
        }
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'data_user',
            key: 'user_id'
        }
    },
    qty_order: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    total_order: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
  })

  data_transaction.associate = (models) => {
    data_transaction.belongsTo(models.data_user, { foreignKey: 'user_id' })
    data_transaction.belongsTo(models.data_product, { foreignKey: 'product_id' })
  }

  return data_transaction;
};