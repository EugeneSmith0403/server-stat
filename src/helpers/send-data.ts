import { ClientRequest, IncomingMessage, request } from "http";
import { SendData, Statistic } from "../classes";
import { ServerResponse } from "../types";
import { Response, Server } from "../enums";

export const sendData = (data: SendData): Promise<ServerResponse | Error> => {
  const dataObj = data.convertToRequest();
  let interval = null;
  const statistic = new Statistic();

  return new Promise((resolve, reject) => {
    const options = {
      hostname: Server.host as string,
      port: Server.port,
      path: "/data",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    };

    let req: ClientRequest = request(options, (res: IncomingMessage) => {
      statistic.increaseRequestCommon();
      if (res.statusCode === 500) {
        clearTimeout(interval);
        reject(`${res.statusCode} error!`);
      }

      res.once("data", (d) => {
        clearTimeout(interval);
        resolve(JSON.parse(d));
      });
    });

    interval = setTimeout(function () {
      statistic.increaseRequestCommon();
      clearTimeout(interval);
      resolve(Response.Aborted);
    }, 10000);

    req.once("error", (error: Error) => {
      statistic.increaseRequestCommon();
      clearTimeout(interval);
      reject(error);
    });

    req.write(JSON.stringify(dataObj));
    req.end();
  });
};
