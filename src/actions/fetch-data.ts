import { IFetchData } from "../interfaces";
import { fetchData } from "../helpers";
import { Statistic } from "../classes";

export const fetchDataAction = async (): Promise<IFetchData> => {
  const statistic = new Statistic();
  const result: IFetchData = (await fetchData()) as IFetchData;
  statistic.increaseRequestCommon();
  return result;
};
