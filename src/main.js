import { createApp, markRaw } from "vue";
import { pinia } from "@/libs/pinia";
import { vuetify } from "@/libs/vuetify";
import router from "@/router";
import App from "./App.vue";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import "@/style.css";

const app = createApp(App);

app.use(
    pinia.use(({ store }) => {
        store.router = markRaw(router);
    })
);

app.use(Toast);
app.use(vuetify);
app.use(router);
app.mount("#app");
