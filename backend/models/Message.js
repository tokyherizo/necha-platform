const { DataTypes } = require('sequelize')
const { sequelize } = require('../config/database')

const Message = sequelize.define('Message', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  content: { type: DataTypes.TEXT, allowNull: false },
  type: { type: DataTypes.ENUM('text', 'file', 'image'), defaultValue: 'text' },
  file_url: { type: DataTypes.STRING },
  is_read: { type: DataTypes.BOOLEAN, defaultValue: false },
  read_at: { type: DataTypes.DATE },
  sender_id: { type: DataTypes.UUID, allowNull: false },
  receiver_id: { type: DataTypes.UUID, allowNull: false },
  conversation_id: { type: DataTypes.STRING, allowNull: false },
})

module.exports = Message
