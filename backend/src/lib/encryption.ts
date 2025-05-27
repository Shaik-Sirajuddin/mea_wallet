import bcrypt from "bcrypt";
export const encryptPassword = async (rawPassword: string) => {
  return await bcrypt.hash(rawPassword, 10);
};
export const encryptData = async (data: string) => {
  return await bcrypt.hash(data, 10);
};
export const comparePassword = async (
  data: string,
  encryptPassword: string
) => {
  return bcrypt.compareSync(data, encryptPassword);
};
