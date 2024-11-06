import { useAtom } from "jotai";
import { isFailSignVisibleAtom, runNewGameFlagAtom, cntPlayFailRoundSoundAtom } from "../store";
import "./GameFailPopup.css";

export default function GameFailPopup() {
	let [isFailSignVisible, setFailSignVisible] = useAtom(isFailSignVisibleAtom);
	let [runNewGameFlag, setRunNewGameFlag] = useAtom(runNewGameFlagAtom);
	let [cntPlayFailRoundSound, setCntPlayFailRoundSound] = useAtom(cntPlayFailRoundSoundAtom);

	const closePopup = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		isFailSignVisible = false;
		setFailSignVisible(isFailSignVisible);
		runNewGameFlag = true;
		setRunNewGameFlag(runNewGameFlag);
		cntPlayFailRoundSound = -1;
		setCntPlayFailRoundSound(cntPlayFailRoundSound);
	};
	return (
		<div className="fail-popup-box">
			<p>FAIL!</p>
			<button onClick={closePopup}>Try Again.</button>
		</div>
	);
}
