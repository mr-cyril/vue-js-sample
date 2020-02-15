import Vue from "vue";
import VueRouter from "vue-router";

import HomeView from "../views/Home.vue";
import PageNotFoundView from "../views/404.vue";

Vue.use(VueRouter);

const ArticleView = () =>
  import(/* webpackChunkName: "article" */ "../views/Article.vue");

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomeView
  },
  {
    path: "/article",
    name: "Article",
    component: ArticleView
  },
  {
    path: "*",
    component: PageNotFoundView
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  scrollBehavior: () => ({
    y: 0
  }),
  routes
});

export { router as default };
