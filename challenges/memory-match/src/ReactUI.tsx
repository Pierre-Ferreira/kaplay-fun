import GameFailPopup from "./ReactComponents/GameFailPopup";
import GameWinPopup from "./ReactComponents/GameWinPopup";
import GameTimeUpPopup from "./ReactComponents/GameTimeUpPopup";
import { useAtomValue } from "jotai";
import { isFailSignVisibleAtom } from "./store";
import { isWinSignVisibleAtom } from "./store";
import { isGameTimeUpAtom } from "./store";
export default function ReactUI() {
	const isFailSignVisible: boolean = useAtomValue(isFailSignVisibleAtom);
	const isWinSignVisible: boolean = useAtomValue(isWinSignVisibleAtom);
	const isGameTimeUp: boolean = useAtomValue(isGameTimeUpAtom);
	if (isFailSignVisible === true) {
		return <>{<GameFailPopup />}</>;
	}
	if (isWinSignVisible === true) {
		return <>{<GameWinPopup />}</>;
	}
	if (isGameTimeUp === true) {
		return <>{<GameTimeUpPopup />}</>;
	}
}
