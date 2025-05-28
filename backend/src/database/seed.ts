import Token from "../models/token";
import User from "../models/user";
import UserBalance from "../models/user_balance";
import { ADMIN_USER_ID } from "../utils/global";

const seedDatabase = async () => {
  //
  const adminEmail = "admin@wallet";
  let admin = await User.findOrCreate({
    where: {
      id: ADMIN_USER_ID,
    },
    defaults: {
      email: adminEmail,
      password: "",
      emoji: "",
      username: adminEmail,
      totp_secret: "",
    },
  });
  if (admin[0].dataValues.email !== adminEmail) {
    throw "First user is not admin";
  }

  //Balance created if only admin has been created
  if (admin[1]) {
    let tokens = await Token.findAll({
      attributes: ["id"],
      where: {},
    });

    await UserBalance.bulkCreate(
      tokens.map((token) => {
        return {
          tokenId: token.dataValues.id,
          userId: ADMIN_USER_ID,
        };
      })
    );
  }
};
