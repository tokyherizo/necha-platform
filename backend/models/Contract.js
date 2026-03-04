const { DataTypes } = require('sequelize')
const { sequelize } = require('../config/database')

const Contract = sequelize.define('Contract', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  title: { type: DataTypes.STRING, allowNull: false },
  type: { type: DataTypes.STRING },
  status: {
    type: DataTypes.ENUM('draft', 'pending', 'signed', 'active', 'completed', 'cancelled'),
    defaultValue: 'draft',
  },
  value: { type: DataTypes.DECIMAL(15, 2) },
  currency: { type: DataTypes.STRING, defaultValue: 'USD' },
  start_date: { type: DataTypes.DATEONLY },
  end_date: { type: DataTypes.DATEONLY },
  signed_at: { type: DataTypes.DATE },
  terms: { type: DataTypes.TEXT },
  file_url: { type: DataTypes.STRING },
  company_a_id: { type: DataTypes.UUID },
  company_b_id: { type: DataTypes.UUID },
  project_id: { type: DataTypes.UUID },
  created_by: { type: DataTypes.UUID },
})

module.exports = Contract
