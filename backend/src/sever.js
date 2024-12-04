const express = require("express");
const http = require("http");
const app = require("./app");
const port = process.env.PORT || 3000;

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
