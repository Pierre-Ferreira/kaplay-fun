import initKaplay from "./kaplayCtx";

export default function initGame() {
    const k = initKaplay();
    k.loadSprite("cardConcealer", "./sprites/k.png");
    k.loadSprite("bean", "./sprites/cards/bean.png");
    k.loadSprite("apple", "./sprites/cards/apple.png");
    k.loadSprite("bobo", "./sprites/cards/bobo.png");
}