import axios from "@/libs/axios";

const {data} = await axios.get("/api/ziggy");

const Ziggy = data;

if (typeof window !== "undefined" && typeof window.Ziggy !== "undefined") {
  Object.assign(Ziggy.routes, window.Ziggy.routes);
}

export {Ziggy};
