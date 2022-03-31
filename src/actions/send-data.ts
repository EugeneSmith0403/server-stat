import { Logger, SendData, Statistic } from "../classes";
import { retry, sendData, serverNotWorkingHandler } from "../helpers";
import { Response } from "../enums";
import { clientResponseHandlerMap } from "../maps";
import { ServerResponse } from "../types";

export const sendDataAction = async (
  data: SendData,
  deliveryAttempt?: number
) => {
  const statistic = new Statistic();
  const model = data.createNewModel();

  if (deliveryAttempt) {
    model.deliveryAttempt = deliveryAttempt;
  }

  try {
    Logger.info("start sending data!");

    const result = (await sendData(model)) as Response;
    statistic.increaseRequestCommon();
    Logger.info(`response data: ${JSON.stringify(result)}`);

    const statMethod = clientResponseHandlerMap.get(result);
    statistic[statMethod]();
  } catch (e) {
    statistic.increaseRequestCommon();
    serverNotWorkingHandler(e);

    const convertedData = new SendData(
      model.pingId,
      model.deliveryAttempt,
      model.date,
      model.responseTime
    );

    Logger.info(e);

    statistic.request500RequestCount();
    ++convertedData.deliveryAttempt;

    Logger.info("retry sending data!");

    await retry<ServerResponse | Error>(
      () => sendDataAction(convertedData, convertedData.deliveryAttempt),
      convertedData.deliveryAttempt
    );

    Logger.info(`retry response`);
  }
};
