import kaplay from "kaplay";

export default function initKaplay() {
	return kaplay({
		width: 1050,
		height: 950,
		// maxFPS:60,
		letterbox: true,
		global: false,
		debug: true, // TODO: Set to false for PROD.
		debugKey: "f1",
		canvas: document.getElementById("game"),
		pixelDensity: devicePixelRatio,
	});
}
