'use strict';
module.exports = (sequelize, DataTypes) => {
  const comment = sequelize.define('comment', {
    content: DataTypes.STRING,
    articleId: DataTypes.INTEGER,
    authorId: DataTypes.INTEGER,
    },{
        hook: {
            beforeCreate: function (comment, options) {
                comment.content = comment.content.toLowerCase();
            }
        }
    });

  comment.associate = function(models) {
    // associations can be defined here
    models.comment.belongsTo(models.article);
    models.comment.belongsTo(models.author);
  };
  return comment;
};
