// import { useAtomValue } from "jotai";
// import { isFailSignVisibleAtom } from "../store";
import "./GameWinPopup.css";

export default function GameWinPopup() {
	return (
		<div className="win-popup-box">
			<p>WINNER!!!</p>
			<button>Continue...</button>
		</div>
	);
}
