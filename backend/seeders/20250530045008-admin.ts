"use strict";

import { QueryInterface } from "sequelize";
import { ADMIN } from "../src/utils/global";
import Token from "../src/models/token";

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
    await queryInterface.bulkInsert("Users", [
      {
        id: ADMIN.USER_ID,
        username: ADMIN.USERNAME,
        email: ADMIN.EMAIL,
        password: "",
        user_iv : "",
        totp_secret: "",
      },
    ]);
    let tokens = await queryInterface.select(Token, "Tokens", {
      where: {},
    });
    await queryInterface.bulkInsert(
      "UserBalances",
      tokens.map((item) => {
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
