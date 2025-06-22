"use strict";

import { DataTypes, QueryInterface } from "sequelize";
import Token from "../src/models/token";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface: QueryInterface, _Sequelize: any) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.removeColumn("Tokens", "description");
    await queryInterface.addColumn("TokenData", "description", {
      type: DataTypes.STRING,
      allowNull: false,
    });
    let tokens = (await queryInterface.select(Token, "Tokens", {
      where: {},
    })) as Token[];
    await queryInterface.bulkInsert("TokenData", [
      tokens.map((token) => {
        return {
          token_id: token.id,
          circulating_suppy: 0,
          total_supply: 0,
          price: 1,
          swap_price: 1,
          description: '',
        };
      }),
    ]);
  },

  async down(_queryInterface: any, _Sequelize: any) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
