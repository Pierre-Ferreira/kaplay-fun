// import { useAtomValue } from "jotai";
// import { isFailSignVisibleAtom } from "../store";
import "./GameTimeUpPopup.css";

export default function GameFailPopup() {
	return (
		<div className="text-box">
			<p>WIN!</p>
			<button>Continue!</button>
		</div>
	);
}
