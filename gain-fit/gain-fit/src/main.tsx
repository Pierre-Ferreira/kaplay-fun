import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import ReactUI from "./ReactUI.tsx";
import initGame from "./KaplayComponents/initGames.ts";
import { Provider } from "jotai";
import { store } from "./store.ts";

// Calculate and set the scale of ui div.
const ui = document.getElementById("ui") as HTMLElement | null;
if (ui && ui.parentElement) {
  const scale = Math.min(
    ui.parentElement.offsetWidth / ui.offsetWidth,
    ui.parentElement.offsetHeight / ui.offsetHeight
  ).toString(); // Convert result to a string

  new ResizeObserver(() => {
    document.documentElement.style.setProperty("--scale", scale);
  }).observe(ui.parentElement);
}

createRoot(document.getElementById("ui")!).render(
  <StrictMode>
    <Provider store={store}>
      <ReactUI />
    </Provider>
  </StrictMode>
);

initGame();
