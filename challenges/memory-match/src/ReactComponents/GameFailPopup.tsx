import { useSetAtom } from "jotai";
import { isFailSignVisibleAtom, runNewGameFlagAtom, cntPlayFailRoundSoundAtom } from "../store";
import "./GameFailPopup.css";

export default function GameFailPopup() {
	//ignore-lint

	const setFailSignVisible = useSetAtom(isFailSignVisibleAtom);
	const setRunNewGameFlag = useSetAtom(runNewGameFlagAtom);
	const setCntPlayFailRoundSound = useSetAtom(cntPlayFailRoundSoundAtom);

	const closePopup = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		setFailSignVisible(false);
		setRunNewGameFlag(true);
		setCntPlayFailRoundSound(-1);
	};
	return (
		<div className="fail-popup-box">
			<p>FAIL!</p>
			<button onClick={closePopup}>Try Again.</button>
		</div>
	);
}
