require("dotenv").config();
const app = require("./app");
const port = process.env.PORT || 80;

const init = async () => {
  try {
    app.listen(port);
    console.log(`App Running at port ${port}`);
  } catch (error) {
    console.log(error);
    process.exit(0);
  }
};

init();
