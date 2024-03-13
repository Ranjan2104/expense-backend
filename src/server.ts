import app from "./App";
import * as http from "http";
import { closeDb } from "./services/MongoDb";
import * as path from "path";
import express from "express";
import cors from "cors";

const port: number = parseInt(process.env.PORT as string, 10) || 8000;
const {createServer} = require('http');

app.set("port", port);
// app.set("view engine", "ejs");
// app.set("views", path.join(__dirname, "templates"));
// app.use(express.static("templates"));


const corsOption = {
  origin:'*' 
}

app.use(cors(corsOption));
const server: http.Server = createServer(app);

server.listen(port, (): void => {
   console.info(`Server  is running at Port:${port}`);
})

server.on("error", onError);

server.on("listening", onListening);

 

/**
 * Event listener for HTTP server "error" event.
 */
function onError(error: any): void {
  if (error.syscall !== "listen") {
    throw error;
  }

  var bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */
function onListening(): void {
  var addr: any = server.address();
  var bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
  // debug('Listening on ' + bind);
}

// Gracefully shutdown the
process.on("SIGINT", function () {
  console.log("Shutting down the server");
  closeDb();
  process.exit(0);
});
process.on("message", function (msg) {
  if (msg == "shutdown") {
    console.log("Closing all connections...");
    closeDb();
    setTimeout(function () {
      console.log("Finished closing connections");
      process.exit(0);
    }, 1500);
  }
});

