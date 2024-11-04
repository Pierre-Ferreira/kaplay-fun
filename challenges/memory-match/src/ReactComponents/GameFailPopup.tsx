// import { useAtomValue } from "jotai";
// import { isFailSignVisibleAtom } from "../store";
import "./GameFailPopup.css";

export default function GameFailPopup() {
	return (
		<div className="fail-popup-box">
			<p>FAIL!</p>
			<button>Try Again.</button>
		</div>
	);
}
