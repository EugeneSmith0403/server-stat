import { Logger } from "../classes";

export const serverNotWorkingHandler = (e): void => {
  if (e.code === "ECONNREFUSED") {
    Logger.error("Error: Server isn't running!");
    process.exit(0);
  }
};
