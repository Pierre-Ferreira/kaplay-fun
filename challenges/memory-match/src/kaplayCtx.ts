import kaplay from "kaplay";

export default function initKaplay() {
    return kaplay({
        width: 1920,
        height: 1080,
        letterbox: true,
        global: false,
        debug: true, // TODO: Set to false for PROD.
        debugKey: "f1",
        canvas: document.getElementById("game"),
        pixelDensity: devicePixelRatio,
    })
}