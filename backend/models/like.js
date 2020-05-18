'use strict';
module.exports = (sequelize, DataTypes) => {
  const Like = sequelize.define('Like', {
    postId: DataTypes.INTEGER,
    references: {
      model: 'Post',
      key: 'id'
    },
    userId: DataTypes.INTEGER,
    references: {
      model: 'User',
      key: 'id'
    },
    isLike: DataTypes.INTEGER
  }, {});
  Like.associate = function(models) {
    // associations can be defined here
    models.User.belongsToMany(models.Post, {
      through: models.Like,
      foreignKey: 'userId',
      otherKey: 'postId',
    });

    models.Message.belongsToMany(models.User, {
      through: models.Like,
      foreignKey: 'postId',
      otherKey: 'userId',
    });

    models.Like.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user',
    });

    models.Like.belongsTo(models.Post, {
      foreignKey: 'postId',
      as: 'post',
    });
  };
  return Like;
};