import { renderToString } from "react-dom/server";
import App from "./App";
import { StaticRouter } from "react-router-dom";

export function render(req) {
  // Server renders exact same wrapper as client
  return renderToString(
    <StaticRouter location={req.url} basename='/'>
      <App />
    </StaticRouter>
  );
}
