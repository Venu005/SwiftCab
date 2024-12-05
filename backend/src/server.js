const express = require("express");
const http = require("http");
const app = require("./app");
const dbConnect = require("./db/db");
const port = process.env.PORT || 3000;

const server = http.createServer(app);

dbConnect()
  .then(() => {
    server.listen(port, () => {
      console.log("database connected ");
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.log("Failed to connect to db");
  });
