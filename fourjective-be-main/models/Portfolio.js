const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Portfolio = sequelize.define('Portfolio', {
  namaSekolah: {
    type: DataTypes.STRING,
    allowNull: false, 
  },
  tahun: {
    type: DataTypes.INTEGER,
    allowNull: false, 
  },
  cover: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  images: {
    type: DataTypes.JSON,
    allowNull: true,
  },
  namaAkun: {
    type: DataTypes.STRING,
    allowNull: false, 
  },
  tanggalCreate: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
    password: {
    type: DataTypes.STRING,
    allowNull: true, 
  },
}, {
  tableName: 'Portfolios', 
  timestamps: false, 
});

module.exports = Portfolio;