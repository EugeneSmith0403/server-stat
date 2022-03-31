export function createDisconnectEvents(cb: Function) {
  let wasCleanedUp = false;

  const runBeforeExiting = (fun: Function) => {
    const exitSignals = [
      "exit",
      "SIGINT",
      "SIGUSR1",
      "SIGUSR2",
      "uncaughtException",
    ];
    for (const signal of exitSignals) {
      process.on(signal as any, async () => {
        if (!wasCleanedUp) {
          await fun();
          wasCleanedUp = true;
        }
        process.exit();
      });
    }
  };

  runBeforeExiting(cb);
}
