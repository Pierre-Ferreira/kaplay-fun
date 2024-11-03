import GameFailPopup from "./ReactComponents/GameFailPopup";
import GameWinPopup from "./ReactComponents/GameWinPopup";
import GameTimeUpPopup from "./ReactComponents/GameTimeUpPopup";
import { useAtomValue } from "jotai";
import { isFailSignVisibleAtom } from "./store";
import { isWinSignVisibleAtom } from "./store";
import { isGameTimeUpAtom } from "./store";
export default function ReactUI() {
	if (useAtomValue(isFailSignVisibleAtom) === true) {
		return <>{<GameFailPopup />}</>;
	}
	if (useAtomValue(isWinSignVisibleAtom) === true) {
		return <>{<GameWinPopup />}</>;
	}
	if (useAtomValue(isGameTimeUpAtom) === true) {
		return <>{<GameTimeUpPopup />}</>;
	}
}
