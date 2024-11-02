import { useAtomValue } from "jotai";
import { cntDoomCounterAtom } from "../store";
import "./DoomCounter.css";

export default function DoomCounter() {
	const doomCount: number = useAtomValue(cntDoomCounterAtom);
	return (
		<div className="text-box">
			<p>Doom in: {doomCount}</p>
		</div>
	);
}
