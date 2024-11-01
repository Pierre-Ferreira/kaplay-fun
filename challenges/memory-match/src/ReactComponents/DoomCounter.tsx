import { useAtomValue } from "jotai";
import { cntDoomCounterAtom } from "../store";
// import "./DoomCounter.css";

export default function DoomCounter() {
	const doomCount: number = useAtomValue(cntDoomCounterAtom);
	return (
		<div>
			<p>Doom in: {doomCount}</p>
		</div>
	);
}
