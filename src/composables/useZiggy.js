import route from "ziggy-js";
import {Ziggy} from "@/ziggy/routes";

export default function useZiggy() {
  function vRoute(name, params, absolute = false) {
    return route(name, params, absolute, Ziggy);
  }

  return {
    vRoute,
  };
}
