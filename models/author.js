'use strict';
module.exports = (sequelize, DataTypes) => {
  const author = sequelize.define('author', {
    name: DataTypes.STRING,
    bio: DataTypes.TEXT,
    image: DataTypes.STRING
  }, {});
  author.associate = function(models) {
      models.author.hasMany(models.article);
      models.author.hasMany(models.commment);
  };
  return author;
};
