import { configure, done, start } from "nprogress";
import Router from "next/router";

configure({
  showSpinner: true,
  easing: "ease",
  speed: 300,
});

export const initRouteLoader = () => {
  Router.events.on("routeChangeStart", () => start());
  Router.events.on("routeChangeComplete", () => done());
  Router.events.on("routeChangeError", () => done());
};
