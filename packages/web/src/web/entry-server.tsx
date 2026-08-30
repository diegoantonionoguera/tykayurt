import { renderToString } from "react-dom/server";
import App from "./app";

export function render(pathname = "/") {
  return renderToString(<App pathname={pathname} />);
}
