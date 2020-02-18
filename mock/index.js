import _ from "lodash";
import uuid from "./utilities/uuid";

import users from "./users.json";
import articles from "./articles.json";
import articleComments from "./article_comments.json";

const delay = (cb, wait = undefined) =>
  setTimeout(cb, _.defaultTo(_.toNumber(wait), _.random(100, 1100)));

const db = Object.seal({
  users,
  articles,
  articleComments
});

const selectUserLastInsertId = () =>
  _.defaultTo(_.toNumber(_.get(_.last(db.users), "user.id")), 0);

const selectUserByToken = token =>
  _.get(
    _.find(db.users, record => _.eq(token, record.token)),
    "user"
  );

const selectUserById = id =>
  _.get(
    _.find(db.users, record => _.eq(+id, +record.user.id)),
    "user"
  );

const selectArticleCommentsById = id =>
  _.map(
    _.filter(db.articleComments, record => _.eq(+id, +record.articleId)),
    record => ({
      ...record,
      user: _.pick(selectUserById(record.userId), ["id", "name"])
    })
  );

const selectArticleCommentsLastInsertId = () =>
  _.defaultTo(_.toNumber(_.get(_.last(db.articleComments), "id")), 0);

const getToken = request => {
  const authorization = _.defaultTo(request.headers.authorization, "");
  const match = authorization.match(/Bearer (.*)/);
  if (!_.isNil(match)) return match[1];
  return null;
};

export default {
  "POST /api/signin": (req, res) => {
    const { login, password } = req.body;
    const record = _.find(
      db.users,
      record =>
        _.eq(login, record.user.login) && _.eq(password, record.user.password)
    );
    if (!_.isNil(record)) {
      return delay(() => res.json(record.token));
    } else {
      return res.status(401).json({ message: "Неверный логин или пароль!" });
    }
  },
  "POST /api/signup": (req, res) => {
    const { name, login, password } = req.body;
    const lastId = selectUserLastInsertId();
    const id = lastId > 0 ? lastId + 1 : 1;
    const user = { id, name, login, password };
    const token = uuid();
    const record = { user, token };
    db.users = [...db.users, record];
    return delay(() => res.json(record.token));
  },
  "GET /api/userinfo": (req, res) => {
    const token = getToken(req);
    if (!_.isNil(token)) {
      const user = selectUserByToken(token);
      if (!_.isNil(user)) {
        return delay(() => res.json(user));
      }
      return res.status(403).json({ message: "Доступ запрещен!" });
    }
    return res.json(null);
  },

  "GET /api/articles/last": (req, res) => {
    return delay(() => res.json(_.last(db.articles)));
  },
  "GET /api/articles/comments/:id": (req, res) => {
    const records = selectArticleCommentsById(req.params.id);
    if (!_.isEmpty(records)) {
      return delay(() => res.json(records));
    }
    return res.json([]);
  },
  "POST /api/articles/comments": (req, res) => {
    const { articleId, userId, datetime, text } = req.body;
    const lastId = selectArticleCommentsLastInsertId();
    const id = lastId > 0 ? lastId + 1 : 1;
    const user = null;
    const record = { id, articleId, userId, user, datetime, text };
    db.articleComments = [...db.articleComments, record];
    return delay(() =>
      res.json({
        ...record,
        user: _.pick(selectUserById(record.userId), ["id", "name"])
      })
    );
  }
};
