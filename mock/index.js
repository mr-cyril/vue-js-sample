import _ from "lodash";

export default {
  "GET /api/user": {
    username: "admin",
    sex: 5
  },
  "GET /api/list": function(req, res) {
    let query = req.query || {};
    return res.json({
      limit: query.limit,
      offset: query.offset,
      list: [
        {
          username: "admin1",
          sex: 1
        },
        {
          username: "admin2",
          sex: 0
        }
      ]
    });
  },
  "GET /api/userinfo/:id": (req, res) => {
    return res.json({
      id: req.params.id,
      username: "kenny"
    });
  },
  "DELETE /api/user/:id": (req, res) => {
    // console.log(req.params.id);
    res.send({ status: "ok", message: "delete success!" });
  },
  "PUT /api/user/:id": (req, res) => {
    // console.log(req.params.id);
    // console.log(req.body);
    res.send({ status: "ok", message: "update success！" });
  },

  "POST /api/signin": (req, res) => {
    const { login, password } = req.body;
    if (password === "888888" && login === "admin") {
      return res.json({ token: "ea135929105c4f29a0f5117d2960926f" });
    } else {
      return res.status(401).json({ message: "Неверный логин или пароль!" });
    }
  },
  "GET /api/articles/last": (req, res) => {
    return res.json({
      id: _.random(1, 99),
      name: "Test",
      text: "Text here..."
    });
  },
  "GET /api/articles/comments/:id": (req, res) => {
    return res.json([{ id: _.random(1, 99), datetime: Date.now(), text: "" }]);
  }
};
