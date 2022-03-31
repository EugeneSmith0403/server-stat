import { IDataDto } from "../interfaces";

export class SendData {
  constructor(
    public pingId: number,
    public deliveryAttempt: number,
    public date: number,
    public responseTime: number
  ) {}

  public assignNewObject(): IDataDto {
    return Object.assign({}, this);
  }

  public createNewModel(): SendData {
    const data = this.assignNewObject();
    return new SendData(
      data.pingId,
      data.deliveryAttempt,
      data.date,
      data.responseTime
    );
  }

  public convertToRequest(): string {
    return JSON.stringify(this.assignNewObject());
  }
}
