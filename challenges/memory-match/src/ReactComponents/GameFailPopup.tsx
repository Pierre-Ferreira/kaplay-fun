import { useAtomValue, useAtom } from "jotai";
import { isFailSignVisibleAtom, runNewGameFlagAtom } from "../store";
import "./GameFailPopup.css";

export default function GameFailPopup() {
	const [isFailSignVisible, setFailSignVisible] = useAtom(
		isFailSignVisibleAtom
	);
	const [runNewGameFlag, setRunNewGameFlag] = useAtom(runNewGameFlagAtom);

	const closePopup = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		console.log("The link was clicked.");
		setFailSignVisible(false);
		setRunNewGameFlag(true);
	};
	return (
		<div className="fail-popup-box">
			<p>FAIL!</p>
			<button onClick={closePopup}>Try Again.</button>
		</div>
	);
}
