import GameFailPopup from "./ReactComponents/GameFailPopup";
import { useAtomValue } from "jotai";
import { isFailSignVisibleAtom } from "./store";
import { isWinSignVisibleAtom } from "./store";
import { isGameTimeUpAtom } from "./store";
export default function ReactUI() {
	if (useAtomValue(isFailSignVisibleAtom) === true) {
		return <>{<GameFailPopup />}</>;
	}
	if (useAtomValue(isWinSignVisibleAtom) === true) {
		return <>{<GameFailPopup />}</>;
	}
	if (useAtomValue(isGameTimeUpAtom) === true) {
		return <>{<GameFailPopup />}</>;
	}
}
