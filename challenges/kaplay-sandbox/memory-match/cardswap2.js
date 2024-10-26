kaplay({
    background: [135, 62, 132],
});

  loadSprite("cardPicture", "/sprites/bean.png");
  loadSprite("cardConcealer", "/sprites/ghosty.png");
  
// reset cursor to default on frame start for easier cursor management
onUpdate(() => setCursor("default"));

function addCard(p) {
    // add a parent background object
    const card = add([
        rect(160, 200, { radius: 8 }),
        pos(p),
        area(),
        scale(1),
        anchor("center"),
        outline(4),
        color(225, 225, 225),
    ]);

    // add a child object that displays the text
    const concealCard = card.add([
        sprite("cardConcealer"),
        anchor("center"),
        area(),
    ]);

    // onHoverUpdate() comes from area() component
    // it runs every frame when the object is being hovered
    card.onHoverUpdate(() => {
        const t = time() * 10;
        card.color = hsl2rgb((t / 10) % 1, 0.6, 0.7);
        card.scale = vec2(1.05);
        setCursor("pointer");
    });

    // onHoverEnd() comes from area() component
    // it runs once when the object stopped being hovered
    card.onHoverEnd(() => {
        card.scale = vec2(1);
        card.color = rgb();
    });

    // onClick() comes from area() component
    // it runs once when the object is clicked
    card.onClick(() => {
        concealCard.destroy()
        card.add([
            sprite("cardPicture"),
            anchor("center"),
        ]);
        card.onUpdate(() => {
            const t = time() * 10;
            card.color = hsl2rgb(255, 255, 255);
            card.scale = vec2(1);
            setCursor("pointer");
        });
    });

    return card;
}

addCard(vec2(200, 200));
addCard(vec2(400, 200));
