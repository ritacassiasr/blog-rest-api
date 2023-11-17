'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable("posts_categories", {
			postId: {
				field: 'post_id',
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: "blog_posts",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
			categoryId: {
				field: 'category_id',
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: "categories",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('posts_categories', null, {});
  }
};
