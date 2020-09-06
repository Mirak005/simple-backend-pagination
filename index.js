const express = require("express");

const users = require("./users");

const app = express();

app.use(express.json());

app.get("/", (req, res) => res.send("HEllo "));

app.get("/users/:page?:n?", async (req, res) => {
  const rgx = new RegExp(req.query.n, "i", "g");
  const response = users.filter((u) => rgx.test(u.name));
  const limit = 2;
  const pages = Math.ceil(response.length / limit);
  const page = req.query.page;
  const endIndex = page * limit;
  const starIndex = endIndex - limit;
  const result = {
    filterName: req.query.n || "none",
    pages,
    starIndex,
    endIndex,
    length: response.length,
    data: {
      users: response.slice(starIndex, endIndex),
    },
  };

  res.send(result);
});

app.listen(5000, (err) => {
  err
    ? console.log(err)
    : console.log("\x1b[36m%s\x1b[0m", "Server is running......");
});
