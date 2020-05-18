'use strict';
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    text: DataTypes.STRING
  }, {});
  Comment.associate = function(models) {
    // associations can be defined here
    models.Comment.belongsTo(models.Post, {
      foreignKey: {
        allowNull: false
      }
    });
    models.Comment.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  return Comment;
};