import { IDataDto } from "../interfaces";
import { retry, sendData } from "../helpers";
import { ServerResponse } from "../types";
import { SendData } from "../classes";

export const retrySendDataAction = async (data: IDataDto) => {
  const { pingId, date, deliveryAttempt, responseTime } = data;
  return await retry<ServerResponse | Error>(
    () => sendData(new SendData(pingId, deliveryAttempt, date, responseTime)),
    data.deliveryAttempt
  );
};
