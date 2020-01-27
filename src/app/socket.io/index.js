const configure = io => {
  io.on("connection", client => {
    console.log(client);
  });
};

module.exports = {
  configure
};
