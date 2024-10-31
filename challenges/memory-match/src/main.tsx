import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import ReactUI from "./ReactUI.tsx";
import initGame from "./initGames.ts";

createRoot(document.getElementById("ui")!).render(
	<StrictMode>
		<ReactUI />
	</StrictMode>
);

initGame();
