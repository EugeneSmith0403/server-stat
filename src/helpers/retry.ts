import { wait } from "./wait";

export const retry = async <T>(fn, depth = 0): Promise<T> => {
  await wait(2 ** depth * 10);
  return await fn();
};
