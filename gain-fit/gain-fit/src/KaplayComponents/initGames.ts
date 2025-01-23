import initKaplay from "../kaplayCtx";
import kettlebell_wok_room from "./scenes/kettlebel_wok_room";
import loadAssets from "./loadAssets";
// import testing-stuff from "./scenes/testing-stuff.ts";

const k = initKaplay();
// Load the assets.
loadAssets(k);

export default function initGame() {
  k.scene("kettlebell_wok_room", () => {
    kettlebell_wok_room(k);
  });
  k.go("kettlebell_wok_room");
}
