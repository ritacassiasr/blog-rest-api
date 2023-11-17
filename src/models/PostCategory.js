"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  const PostCategory = sequelize.define(
    "PostCategory",
    {
      postId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        // references: {
        //   model: "BlogPost",
        //   key: "id",
        // },
      },
      categoryId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        // references: {
        //   model: "Category",
        //   key: "id",
        // },
      },
    },
    {
      timestamps: false,
      tableName: "posts_categories",
      underscored: true,
    }
  );

  PostCategory.associate = (models) => {
		models.Category.belongsToMany(models.BlogPost, {
			through: PostCategory,
      as: "posts",
			foreingKey: "categoryId",
			otherKey: "postId",
		});

		models.BlogPost.belongsToMany(models.Category, {
			through: PostCategory,
      as: "categories",
			foreignKey: "postId",
			otherKey: "categoryId",
		});		
  };

  return PostCategory;
};
