import { atom, createStore } from "jotai";

export const isFailSignVisibleAtom = atom(false);
export const isWinSignVisibleAtom = atom(false);
export const isDoomCounterVisibleAtom = atom(false);
export const isDoomCounterDisplayVisibleAtom = atom(false);
export const cntDoomCounterAtom = atom(0);
export const store = createStore();
