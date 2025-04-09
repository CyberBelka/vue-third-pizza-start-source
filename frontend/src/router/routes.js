export default [
  {
    path: "/",
    name: "HomeView",
    component: () => import("../views/HomeView.vue"),
    meta: { layout: "AppLayout" },
  },
  {
    path: "/login",
    name: "LoginView",
    component: () => import("../views/HomeView.vue"),
    meta: { layout: "AppLayoutLogin" },
  },
];