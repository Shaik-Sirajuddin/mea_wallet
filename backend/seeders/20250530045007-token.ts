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
    await queryInterface.bulkInsert("Token", [
      {
        name: "Recon",
        symbol: "RECON",
        description: "RWA on-chain",
        decimals: 6,
      },
      {
        name: "Mecca",
        symbol: "MEA",
        description: "Real Value Ecosystem ",
        decimals: 6,
      },
      {
        name: "Mecca",
        symbol: "MEA",
        description: "Real Value Ecosystem ",
        decimals: 6,
      },
      {
        name: "FOX9",
        symbol: "FOX9",
        description: "Korean Fox Master",
        decimals: 6,
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
