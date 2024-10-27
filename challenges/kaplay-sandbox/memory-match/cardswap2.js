kaplay({
    background: [135, 62, 132],
});

  loadSprite("cardPicture", "/sprites/bean.png");
  loadSprite("cardConcealer", "/sprites/ghosty.png");
  
// reset cursor to default on frame start for easier cursor management
onUpdate(() => setCursor("default"));

function addCard(p, card_tag, unique_id_tag) {
    // add a card object
    const card = add([
        rect(160, 200, { radius: 8 }),
        pos(p),
        area(),
        scale(1),
        anchor("center"),
        outline(4),
        color(225, 225, 225),
        card_tag,
        unique_id_tag,
        {
            card_solved: false,
            card_selected: false,
        },
    ]);
    // let card_selected = false
    // let card_solved = false

    // Function to create a card concealer.
    function createCardConcealer() {
        return [
            sprite("cardConcealer"),
            anchor("center"),
            area(),
        ];
    }
    // Add a card concealer as a child to the card
    const cardConcealer = card.add(createCardConcealer());

    // Function to create a card picture
    function createCardPicture() {
        return [
            sprite("cardPicture"),
            anchor("center"),
            area(),
            unique_id_tag,
        ];
    }
    
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
        if (!card.card_solved) {
            // Check if the same card was clicked.
            let notSameCardSelected = true
            if (selected_cards_tags[0] !== undefined) {
                if (unique_id_tag === selected_cards_tags[0].unique_id_tag) {
                    notSameCardSelected = false
                }
            }
            // If it same card was not selected then continue.
            if (notSameCardSelected) {
                debug.log("Update selected card!")
                // Remove card concealer.
                cardConcealer.destroy()
                // Display the card picture.
                const cardPicture = card.add(createCardPicture());
                card.onHoverUpdate(() => {
                    card.color = hsl2rgb(255, 255, 255);
                    card.scale = vec2(1);
                });
                card.card_selected = true
                no_of_cards_selected += 1
                let cardObj = {
                    card_tag,
                    unique_id_tag,
                }
                selected_cards_tags.push(cardObj)
                // Check if two cards have been selected.
                if (no_of_cards_selected >= 2) {
                    debug.log("Two selected")
                    // Check if the two cards match. 
                    checkCardMatch()
                    no_of_cards_selected = 0
                    selected_cards_tags = []
                }
            }
            debug.log(selected_cards_tags)
        }
    });

    // Function to check if the two cards selected have matching tags.
    function checkCardMatch() {

        if (selected_cards_tags[0].card_tag === selected_cards_tags[1].card_tag) {
            debug.log("MATCHING!!!")
            solvedPairsCnt += 1
            get(card_tag).forEach((e) => {
                addKaboom(e.pos.sub(0, 50));
                e.card_solved = true
                e.color = YELLOW
                e.onHoverUpdate(() => {
                    e.color = YELLOW;
                    e.scale = vec2(1.025);
                });
                e.onHoverEnd(() => {
                    e.color = YELLOW;
                    e.scale = vec2(1);
                });
                e.sprite
            })
        } else {
            debug.log("NOT MATCHING!!!")
            get(selected_cards_tags[0].unique_id_tag, {recursive: true}).forEach((e1) => {
                resetCard(e1, selected_cards_tags[0].unique_id_tag)
            })

            get(selected_cards_tags[1].unique_id_tag, {recursive: true}).forEach((e2) => {
                resetCard(e2, selected_cards_tags[1].unique_id_tag)
            })
 
        }
    }
    function resetCard(e, unique_id_tag) {
        debug.log("resetCard")
        e.children.forEach((child) => {
            debug.log("CHILD????:", child.is(unique_id_tag))
            if (child.is(unique_id_tag)) {
                child.destroy()
            }
        });
        e.add(createCardConcealer())
        e.onHoverUpdate(() => {
            const t = time() * 10;
            e.color = hsl2rgb((t / 10) % 1, 0.6, 0.7);
            e.scale = vec2(1.05);
            setCursor("pointer");
        });
    }

    return card;
}
let solvedPairsCnt = 0
let solvedPairsForWin = 1
let no_of_cards_selected = 0;
let selected_cards_tags = []
addCard(vec2(200, 200), "beaner", "85563");
addCard(vec2(400, 200), "beans", "38283");
addCard(vec2(200, 450), "bean", "382d83");
addCard(vec2(400, 450), "bean", "382w83");
