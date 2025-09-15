import fs from "fs";
import path from "path";

export function loadTemplate(filePath) {
  return fs.readFileSync(path.resolve(filePath), "utf-8");
}

//  const template = fs.readFileSync(
//       path.join(clientDist, "index.html"),
//       "utf-8"
//     );

export function injectAppHtml(template, appHtml) {
  return template.replace("<!--app-html-->", appHtml);
}
