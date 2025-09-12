import React from "react";
import { renderToString } from "react-dom/server";
import App from "./App";

export function render(url) {
  // Server renders exact same wrapper as client
  return renderToString(<App />);
}
