import { createWebHistory, createRouter } from "vue-router";
import { useUsers } from "@/stores/user";
import PageNotFound from "@/pages/errors/404.vue";

const APP_NAME = import.meta.env.VITE_APP_NAME;

const routes = [
    {
        path: "/page-not-found",
        name: "page-not-found",
        component: PageNotFound,
        meta: {
            title: "Page Not Found",
        },
    },
    {
        path: "/:pathMatch(.*)*",
        redirect: "/page-not-found",
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

// Navigation guard

router.beforeEach((to, from, next) => {
    const store = useUsers();

    const auth = store.authUser;

    if (to.matched.some((route) => route.meta.guard === "guest") && auth)
        next({ name: "dashboard" });
    else if (to.matched.some((route) => route.meta.guard === "auth") && !auth)
        next({ name: "login" });
    else next();
});

// Page Title and Metadata

router.beforeEach((to, from, next) => {
    const nearestWithTitle = to.matched
        .slice()
        .reverse()
        .find((r) => r.meta && r.meta.title);

    if (nearestWithTitle) {
        document.title = nearestWithTitle.meta.title + " - " + APP_NAME;
    } else {
        document.title = APP_NAME;
    }

    Array.from(document.querySelectorAll("[data-vue-router-controlled]")).map(
        (el) => el.parentNode.removeChild(el)
    );

    next();
});

export default router;
