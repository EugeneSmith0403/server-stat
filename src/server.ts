import {
  createDisconnectEvents,
  generateResponse,
  makeServerResponseEvents,
} from "./helpers";
import * as http from "http";
import { IncomingMessage, ServerResponse } from "http";
import { Logger } from "./classes";
import { Ping } from "./classes";
import { serverResponseHandlerMap } from "./maps";
import { Server } from "./enums";

const totalPing = new Ping();

const server = http.createServer(async function (
  request: IncomingMessage,
  response: ServerResponse
) {
  if (request.method === "POST" && ~request.url.indexOf("data")) {
    makeServerResponseEvents(request, (obj) => {
      totalPing.addPing(obj.responseTime);
    });

    const result = generateResponse();
    const handler = serverResponseHandlerMap.get(result);
    handler(response, result);
  } else {
    response.end("");
  }
});

server.listen(Server.port, () => {
  Logger.log("server is starting!!!");
});

createDisconnectEvents(() => {
  totalPing.calculateAveragePing();
  totalPing.calculateMedianPing();
  Logger.log(
    `Median: ${totalPing.getMedianPing()}, Average: ${totalPing.getAveragePing()}`
  );
});
