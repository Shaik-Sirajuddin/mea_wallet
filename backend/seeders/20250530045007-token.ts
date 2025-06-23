"use strict";

import { QueryInterface } from "sequelize";

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
    await queryInterface.bulkInsert("Tokens", [
      {
        name: "Recon",
        symbol: "RECON",
        decimals: 6,
      },
      {
        name: "Mecca",
        symbol: "MEA",
        decimals: 6,
      },
      {
        name: "FOX9",
        symbol: "FOX9",
        decimals: 6,
      },
      {
        name: "USDT",
        symbol: "USDT",
        decimals: 6,
      },
      {
        name: "Solana",
        symbol: "SOL",
        decimals: 9,
      },
    ]);
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
