import Vue from "vue";
import VueRouter from "vue-router";
import AboutView from "../views/AboutView.vue";
import MainDefault from "../layout/MainDefault.vue";
import ZeroWaste from "../views/ZeroWaste";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "ZeroWaste",
    component: MainDefault,
    meta: { backgroundColor: "#F8FFF9" },
    children: [
      {
        path: "",
        component: ZeroWaste,
      },
    ],
  },
  {
    path: "/about",
    name: "about",
    component: MainDefault,
    meta: { backgroundColor: "#F8FE99" },
    children: [
      {
        path: "",
        component: AboutView,
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;