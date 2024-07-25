import React from "react";
import Cookies from "js-cookie";
import { createRoot } from "react-dom/client";
import { Meteor } from "meteor/meteor";
import { App } from "../imports/ui/App";

const cookieKeys = ["Meteor.loginToken", "Meteor.userId"];

Meteor.startup(() => {
  const container = document.getElementById("react-target");
  const root = createRoot(container);
  document.documentElement.setAttribute("lang", "en");
  document.documentElement.setAttribute(
    "class",
    "h-full bg-white scroll-smooth",
  );
  root.render(<App />);
  Accounts.onLogin(() => {
    cookieKeys.forEach((key) => {
      Cookies.set(key, Meteor._localStorage.getItem(key), {
        secure: true,
        sameSite: "lax",
      });
    });
  });
  Accounts.onLogout(() => {
    cookieKeys.forEach((key) => {
      Cookies.remove(key);
    });
  });
});
