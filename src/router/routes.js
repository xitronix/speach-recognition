const routes = [
  {
    path: "/app",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/IndexPage.vue") }],
    meta: { auth: true },
  },
  {
    path: "/",
    component: () => import("layouts/AuthLayout.vue"),
    children: [
      { path: "/", redirect: "/login" },
      { path: "login", component: () => import("src/pages/LoginPage.vue") },
      {
        path: "register",
        component: () => import("src/pages/RegisterPage.vue"),
      },
    ],
    meta: { auth: false },
  },
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
