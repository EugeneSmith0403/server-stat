import { IStatistic } from "../interfaces";
import { IIncreaseProp } from "../types/increase";

export class Statistic {
  private static instance: Statistic;
  private result: IStatistic = {
    requestCount: 0,
    successfulRequestCount: 0,
    request500Count: 0,
    frozeRequestCount: 0,
  };

  constructor() {
    if (Statistic.instance) {
      return Statistic.instance;
    }

    Statistic.instance = this;
  }

  private increase(prop: IIncreaseProp): void {
    this.result[prop]++;
  }

  public increaseRequestCommon(): void {
    this.increase("requestCount");
  }

  public increaseSuccessfulRequestCount(): void {
    this.increase("successfulRequestCount");
  }

  public request500RequestCount(): void {
    this.increase("request500Count");
  }

  public frozeRequestCount(): void {
    this.increase("frozeRequestCount");
  }

  public getResult() {
    return this.result;
  }
}
