import { IFetchData } from "../interfaces";
import { fetchData } from "../helpers";

export const fetchDataAction = async (): Promise<IFetchData> => {
  return (await fetchData()) as IFetchData;
};
