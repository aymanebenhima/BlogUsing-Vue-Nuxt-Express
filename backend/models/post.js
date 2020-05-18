'use strict';
module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {

    title: DataTypes.STRING,
    content: DataTypes.STRING,
    attachment: DataTypes.STRING,
    likes: DataTypes.INTEGER
  }, {});
  Post.associate = function(models) {
    // associations can be defined here
    models.Post.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });

    models.Post.hasMany(models.Comment);
  };
  return Post;
};