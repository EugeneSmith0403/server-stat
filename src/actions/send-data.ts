import { Logger, SendData, Statistic } from "../classes";
import { sendData, serverNotWorkingHandler } from "../helpers";
import { Response } from "../enums";
import { clientResponseHandlerMap } from "../maps";
import { retrySendDataAction } from "./retry-send-data";

export const sendDataAction = async (data: SendData) => {
  const statistic = new Statistic();
  const model = data.createNewModel();
  try {
    Logger.info("start sending data!");

    const result = (await sendData(model)) as Response;

    Logger.info(`receive data: ${JSON.stringify(result)}`);

    const statMethod = clientResponseHandlerMap.get(result);
    statistic[statMethod]();
  } catch (e) {
    serverNotWorkingHandler(e);

    const convertedData = new SendData(
      model.pingId,
      model.deliveryAttempt,
      model.date,
      model.responseTime
    );

    Logger.info(e);

    statistic.request500RequestCount();
    convertedData.deliveryAttempt++;

    Logger.info("retry sending data!");

    const res = await retrySendDataAction(convertedData);

    Logger.info(`receive data: ${JSON.stringify(res)}`);
  }
};
