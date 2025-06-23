import { createClient } from "redis";

const redisClient = createClient({
  url: process.env.REDIS_URL || "redis://localhost:6379",
  database: Number(process.env.REDIS_DB_NO ?? 1),
});
redisClient.on("error", (err) => console.log("Redis Client Error", err));
export const redisConnect = async () => {
  await redisClient.connect();
  console.log("Connected to Redis");
};

// Function to set cached data
export const setCacheData = async (
  key: string,
  data: any,
  expirationInSeconds = 3600
) => {
  await redisClient.setEx(
    key,
    expirationInSeconds,
    JSON.stringify({ data: data })
  );
};

// Function to get cached data
export const getCacheData = async <T>(key: string) => {
  let data = (await redisClient.get(key)) as string;
  let result = data ? JSON.parse(data) : null;
  return result ? (result.data as T) : null;
};

export const setCacheDataWithoutExpiration = async (key: string, data: any) => {
  await redisClient.set(key, JSON.stringify({ data: data }));
};
export default redisClient;
