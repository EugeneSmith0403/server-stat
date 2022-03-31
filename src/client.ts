import { Logger, SendData, Statistic } from "./classes";
import { createDisconnectEvents } from "./helpers";
import { IFetchData } from "./interfaces";
import { fetchDataAction, sendDataAction } from "./actions";

const statistic = new Statistic();

const init = () => {
  let pingId = 0;
  setInterval(async () => {
    try {
      const result: IFetchData = (await fetchDataAction()) as IFetchData;
      const data = new SendData(++pingId, 1, result.date, result.responseTime);
      await sendDataAction(data);
    } catch (err) {
      Logger.error(err);
    }
  }, 1000);
};

init();

createDisconnectEvents(() => Logger.info(statistic.getResult()));
