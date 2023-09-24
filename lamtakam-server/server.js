const server = require("./index");
const dns = require('dns');

dns.setDefaultResultOrder("ipv4first");
server.listen(8000, () => {
  console.log("server start on port 8000");
});
