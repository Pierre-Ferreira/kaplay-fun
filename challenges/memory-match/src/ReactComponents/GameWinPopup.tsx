// import { useAtomValue } from "jotai";
// import { isFailSignVisibleAtom } from "../store";
import "./GameWinPopup.css";

export default function GameWinPopup() {
	return (
		<div className="win-popup-box">
			<p>SUCCESS!</p>
			<button>Continue...</button>
		</div>
	);
}
