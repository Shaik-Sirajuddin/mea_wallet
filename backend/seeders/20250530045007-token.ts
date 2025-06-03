"use strict";

import { QueryInterface } from "sequelize";
import { ADMIN } from "../src/utils/global";
import Token from "../src/models/token";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface: QueryInterface, Sequelize) {
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

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
