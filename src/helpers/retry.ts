import { wait } from "./wait";

export const retry = async <T>(fn, depth = 0): Promise<T> => {
  try {
    if (depth > 0) {
      await wait(2 ** depth * 10);
    }
    return await fn();
  } catch (e) {
    await wait(2 ** depth * 10);
    return retry(fn, depth + 1);
  }
};
