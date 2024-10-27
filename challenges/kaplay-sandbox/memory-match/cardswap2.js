kaplay({
    background: [135, 62, 132],
});

  loadSprite("bean", "/sprites/bean.png");
  loadSprite("cardConcealer", "/sprites/k.png");
  loadSprite("apple", "/sprites/apple.png");
  loadSprite("bobo", "/sprites/bobo.png");
  
scene("memory_match_board", () => {

// reset cursor to default on frame start for easier cursor management.
onUpdate(() => setCursor("default"));

// Function to add a card.
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
            card_reveal_allowed: true,
        },
    ]);

    // Function to create a card concealer.
    function createCardConcealer() {
        return [
            sprite("cardConcealer"),
            anchor("center"),
            area(),
            "card-concealer",
        ];
    }
    // Add a card concealer as a child to the card
    card.add(createCardConcealer());

    // Function to create a card picture
    function createCardPicture() {
        return [
            sprite(card_tag),
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
        card.color = rgb(255, 255, 255);
    });

    // onClick() comes from area() component
    // it runs once when the object is clicked
    card.onClick(() => {
        // Only continue if the card is not solved and card is allowed to be revealed.
        if (!card.card_solved && card.card_reveal_allowed) {
            // Prevent card from being reveal, until reset of card.
            card.card_reveal_allowed = false
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
                // Remove card concealer child.
                destroyChildrenOfGameObject(card, "card-concealer")
                // Display the card picture child.
                card.add(createCardPicture());
                // Set color of selected card and hover properties.
                card.color = RED
                card.onHoverUpdate(() => {
                    card.color = RED;
                    card.scale = vec2(1);
                });
                card.onHoverEnd(() => {
                    card.color = RED;
                    card.scale = vec2(1);
                });

                // Create card object and push it to selected card array.
                let cardObj = {
                    card_tag,
                    unique_id_tag,
                }
                selected_cards_tags.push(cardObj)
                // Increase the number of cards selected.
                no_of_cards_selected += 1
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

    // Store the selected cards in local variables to capture their values in this scope
    const firstSelectedCardArrObj = selected_cards_tags[0];
    const secondSelectedCardArrObj = selected_cards_tags[1];

    // Check if the first card and second card selected have matching tags.
    if (firstSelectedCardArrObj.card_tag === secondSelectedCardArrObj.card_tag) {
        debug.log("MATCHING!!!");
        // MATCHING cards.
        solvedPairsCnt += 1;
        get(firstSelectedCardArrObj.card_tag).forEach((e) => {
            addKaboom(e.pos.sub(0, 50));
            e.card_solved = true;
            e.color = YELLOW;
            e.onHoverUpdate(() => {
                e.color = YELLOW;
                e.scale = vec2(1.025);
            });
            e.onHoverEnd(() => {
                e.color = YELLOW;
                e.scale = vec2(1);
            });
        });
    } else {
        debug.log("NOT MATCHING!!!");
        // Pause for split seconds before resetting unmatched cards.
        wait(0.6, () => {
            // Reset first selected card.
            get(firstSelectedCardArrObj.unique_id_tag).forEach((e1) => {
                resetCard(e1, firstSelectedCardArrObj.unique_id_tag);
            });
            // Reset second selected card.
            get(secondSelectedCardArrObj.unique_id_tag).forEach((e2) => {
                resetCard(e2, secondSelectedCardArrObj.unique_id_tag);
            });
        });
    }
}

    function destroyChildrenOfGameObject(gameObj,tag) {
        // Loop through the game objects children and destroy those that matches the tag.
        gameObj.children.forEach((child) => {
            if (child.is(tag)) {
                child.destroy()
            }
        });
    }

    function resetCard(card, tag) {
        // Destroy the card picture child.
        destroyChildrenOfGameObject(card, tag)
        // Add the card concealer child.
        card.add(createCardConcealer())
        // Allow card to be revealed again.
        card.card_reveal_allowed = true
        // Reset card color and hover properties
        card.color = rgb(255, 255, 255);
        card.onHoverUpdate(() => {
            const t = time() * 10;
            card.color = hsl2rgb((t / 10) % 1, 0.6, 0.7);
            card.scale = vec2(1.05);
            setCursor("pointer");
        });
        card.onHoverEnd(() => {
            card.color = rgb(255, 255, 255);
            card.scale = vec2(1);
        });
    }

    return card;
}



let solvedPairsCnt = 0
let solvedPairsForWin = 1
let no_of_cards_selected = 0;
let selected_cards_tags = []
addCard(vec2(200, 200), "bobo", "85563");
addCard(vec2(400, 200), "bean", "38283");
addCard(vec2(200, 450), "bean", "382d83");
addCard(vec2(400, 450), "apple", "382w83");
});

go("memory_match_board");
