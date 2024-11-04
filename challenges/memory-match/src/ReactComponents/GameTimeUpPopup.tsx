// import { useAtomValue } from "jotai";
// import { isFailSignVisibleAtom } from "../store";
import "./GameTimeUpPopup.css";

export default function GameTimeUpPopup() {
	return (
		<div className="timeup-popup-box">
			<p>TIME IS UP!</p>
			<button>CONTINUE...</button>
		</div>
	);
}
