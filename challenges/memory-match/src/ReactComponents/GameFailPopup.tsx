import { useSetAtom } from "jotai";
import { isFailSignVisibleAtom, runNewGameFlagAtom, cntPlayFailRoundSoundAtom } from "../store";
import "./GameFailPopup.css";

export default function GameFailPopup() {
	//ignore-lint

	const setFailSignVisibleAtom = useSetAtom(isFailSignVisibleAtom);
	const setRunNewGameFlagAtom = useSetAtom(runNewGameFlagAtom);
	const setCntPlayFailRoundSoundAtom = useSetAtom(cntPlayFailRoundSoundAtom);

	const closePopup = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		setFailSignVisibleAtom(false);
		setRunNewGameFlagAtom(true);
		setCntPlayFailRoundSoundAtom(-1);
	};
	return (
		<div className="fail-popup-box">
			<p>FAIL!</p>
			<button onClick={closePopup}>Try Again.</button>
		</div>
	);
}
