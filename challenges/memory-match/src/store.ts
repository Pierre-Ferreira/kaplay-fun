import { PrimitiveAtom } from "jotai";
import { atom, createStore } from "jotai";

export const isFailSignVisibleAtom: PrimitiveAtom<boolean> = atom(false);
export const isWinSignVisibleAtom: PrimitiveAtom<boolean> = atom(false);
// export const isDoomCounterVisibleAtom = atom(false);
// export const isDoomCounterDisplayVisibleAtom = atom(false);
export const noOfCardsSelectedAtom: PrimitiveAtom<number> = atom(0);
export const solvedPairsCntAtom: PrimitiveAtom<number> = atom(0);
export const solvedPairsForWinAtom: PrimitiveAtom<number> = atom(0);
export const cntDoomCounterAtom: PrimitiveAtom<number> = atom(0);
export const cntRoundsAtom: PrimitiveAtom<number> = atom(0);
export const selectedCardsTagsAtom: PrimitiveAtom<[]> = atom([]);
export const store = createStore();
