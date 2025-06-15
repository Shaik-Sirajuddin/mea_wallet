"use strict";

import { Op, QueryInterface } from "sequelize";
import Token from "../src/models/token";
import { ADMIN } from "../src/utils/global";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface: QueryInterface, _Sequelize: any) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    const tokens = [
      {
        name: "USDT",
        symbol: "USDT",
        description: "Stablecoin pegged to US Dollar",
        decimals: 6,
      },
      {
        name: "Solana",
        symbol: "SOL",
        description: "Solana native coin",
        decimals: 9,
      },
    ];
    await queryInterface.bulkInsert("Tokens", tokens);

    let createdTokens = await queryInterface.select(Token, "Tokens", {
      where: {
        symbol: {
          [Op.in]: tokens.map((token) => token.symbol),
        },
      },
    });
    
    await queryInterface.bulkInsert(
      "UserBalances",
      createdTokens.map((item) => {
        return {
          userId: ADMIN.USER_ID,
          //@ts-ignore this
          tokenId: item["id"],
          amount: 0,
          lockedAmount: 0,
        };
      })
    );
  },

  async down(_queryInterface: any, _Sequelize: any) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
