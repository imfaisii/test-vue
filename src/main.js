import { createApp, markRaw } from "vue";
import { pinia } from "@/libs/pinia";
import { vuetify } from "@/libs/vuetify";
import router from "./router";
import App from "./App.vue";
import "./style.css";

const app = createApp(App);

app.use(
    pinia.use(({ store }) => {
        store.router = markRaw(router);
    })
);

app.use(vuetify);
app.use(router);
app.mount("#app");
