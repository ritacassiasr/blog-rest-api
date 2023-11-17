"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  const BlogPost = sequelize.define(
    "BlogPost",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      title: DataTypes.STRING,
      content: DataTypes.STRING,
      userId: {
        type: DataTypes.INTEGER,
        foreingKey: true,
      },
      published: DataTypes.DATE,
      updated: DataTypes.DATE,
    },
    {
      timestamps: false,
      tableName: "blog_posts",
      underscored: true,
      createdAt: "published",
      updatedAt: "updated",
		});
	
	BlogPost.associate = (models) => {
		BlogPost.belongsTo(models.User, {
			as: 'user',
			foreingKey: 'userId',
		})
	}

  return BlogPost;
};
