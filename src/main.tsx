import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";

// Focus rings are for keyboard navigation only: Tab turns them on, any pointer or touch turns them off.
const root = document.documentElement;
window.addEventListener("keydown", (e) => { if (e.key === "Tab") root.classList.add("using-keyboard"); }, true);
for (const type of ["mousedown", "pointerdown", "touchstart"]) {
  window.addEventListener(type, () => root.classList.remove("using-keyboard"), { capture: true, passive: true });
}

createRoot(document.getElementById("root")!).render(<StrictMode><App /></StrictMode>);
