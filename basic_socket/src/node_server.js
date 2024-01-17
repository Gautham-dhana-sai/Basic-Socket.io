const app = require("express")();

const htmlRoute = require("./htmlRoutes");

// const server = require("http").createServer(app, (req, res) => {
// });
app.use(htmlRoute);

app.listen(3000, () => {
  console.log("Node server is running...");
});
