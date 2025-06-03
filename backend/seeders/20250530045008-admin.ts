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
    await queryInterface.bulkInsert("User", [
      {
        id: ADMIN.USER_ID,
        username: ADMIN.USERNAME,
        email: ADMIN.EMAIL,
        password: "",
        totp_secret: "",
      },
    ]);
    let tokens = await queryInterface.select(Token, "Token", {
      where: {},
    });
    await queryInterface.bulkInsert(
      "UserBalance",
      tokens.map((item) => {
        return {
          user_id: ADMIN.USER_ID,
          token_id: item["id"],
          amount: 0,
          lockedAmount: 0,
        };
      })
    );
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
