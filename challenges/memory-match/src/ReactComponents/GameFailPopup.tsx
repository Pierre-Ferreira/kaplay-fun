// import { useAtomValue } from "jotai";
// import { isFailSignVisibleAtom } from "../store";
import "./GameFailPopup.css";

export default function GameFailPopup() {
	return (
		<div className="text-box">
			<p>FAIL!</p>
			<button>Try Again!</button>
		</div>
	);
}
