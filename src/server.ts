import { app } from "./app.js";

app
  .listen({
    port: 3333,
    host: "0.0.0.0", // helps with the 'front-end' connection
  })
  .then(() => {
    console.log("HTTP Server Running!!");
  });
