import { PrimitiveAtom } from "jotai";
import { atom, createStore } from "jotai";

export const isFailSignVisibleAtom: PrimitiveAtom<boolean> = atom(false);
export const isWinSignVisibleAtom: PrimitiveAtom<boolean> = atom(false);
export const isGameTimeUpAtom: PrimitiveAtom<boolean> = atom(false);
export const isGameCompletedAtom: PrimitiveAtom<boolean> = atom(false);
export const isRoundCompletedAtom: PrimitiveAtom<boolean> = atom(false);
export const runNewGameFlagAtom: PrimitiveAtom<boolean> = atom(false);
export const cntPlayFailRoundSoundAtom: PrimitiveAtom<number> = atom(0);
export const cntPlayGameWonSoundAtom: PrimitiveAtom<number> = atom(0);
export const noOfCardsSelectedAtom: PrimitiveAtom<number> = atom(0);
export const solvedPairsCntAtom: PrimitiveAtom<number> = atom(0);
export const solvedPairsForWinAtom: PrimitiveAtom<number> = atom(0);
export const cntDoomCounterAtom: PrimitiveAtom<number> = atom(0);
export const initDoomCounterAtom: PrimitiveAtom<number> = atom(0);
export const cntRoundsAtom: PrimitiveAtom<number> = atom(0);
export const selectedCardsTagsAtom: PrimitiveAtom<[]> = atom([]);
export const store = createStore();
