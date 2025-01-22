import { PrimitiveAtom } from "jotai";
import { atom, createStore } from "jotai";

export const isShowingInfoTextAtom: PrimitiveAtom<boolean> = atom(false);

export const store = createStore();
