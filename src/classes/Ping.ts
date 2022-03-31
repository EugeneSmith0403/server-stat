export class Ping {
  private averagePing = 0;
  private medianPing = 0;
  private arrayDataDto: number[] = [];

  public addPing(el: number): void {
    let i = 0;
    while (i < this.arrayDataDto.length && this.arrayDataDto[i] < el) {
      i++;
    }
    this.arrayDataDto.splice(i, 0, el);
  }

  public calculateMedianPing(): void {
    const len = this.arrayDataDto.length;
    const center = len % 2;
    const middle = Math.round(len / 2);
    if (center === 0) {
      this.medianPing =
        (this.arrayDataDto[middle] + this.arrayDataDto[middle - 1]) / 2;
    }

    this.medianPing = this.arrayDataDto[middle - 1];
  }

  public calculateAveragePing(): void {
    this.averagePing = Math.round(
      this.arrayDataDto.reduce((acc, el: number) => {
        return acc + el;
      }, 0) / this.arrayDataDto.length
    );
  }

  public getAveragePing(): number {
    return this.averagePing;
  }

  public getMedianPing(): number {
    return this.medianPing;
  }
}
