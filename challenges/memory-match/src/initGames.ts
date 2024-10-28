import initKaplay from "./kaplayCtx";

export default function initGame() {
    const k = initKaplay();
    k.setBackground(135, 62, 132);
    k.loadSprite("cardConcealer", "./sprites/k.png");
    k.loadSprite("bean", "./sprites/cards/bean.png");
    k.loadSprite("apple", "./sprites/cards/apple.png");
    k.loadSprite("bobo", "./sprites/cards/bobo.png");
    k.loadSprite("butterfly", "./sprites/cards/butterfly.png");
    k.loadSprite("meat", "./sprites/cards/meat.png");
    k.loadSprite("note", "./sprites/cards/note.png");
    k.loadSprite("grapes", "./sprites/cards/grapes.png");
    k.loadSprite("moon", "./sprites/cards/moon.png");

    k.scene("memory_match_board", () => {

        // reset cursor to default on frame start for easier cursor management.
        k.onUpdate(() => k.setCursor("default"));
    
        // Function to add a card.
        function addCard(p, card_tag, unique_id_tag) {
            // add a card object
            const card = k.add([
                k.rect(160, 200, { radius: 8 }),
                k.pos(p),
                k.area(),
                k.scale(1),
                k.anchor("center"),
                k.outline(4),
                k.color(225, 225, 225),
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
                    k.sprite("cardConcealer"),
                    k.anchor("center"),
                    k.area(),
                    "card-concealer",
                ];
            }
            // Add a card concealer as a child to the card
            card.add(createCardConcealer());
    
            // Function to create a card picture
            function createCardPicture() {
                return [
                    k.sprite(card_tag),
                    k.anchor("center"),
                    k.area(),
                    unique_id_tag,
                ];
            }
            
            // onHoverUpdate() comes from area() component
            // it runs every frame when the object is being hovered
            card.onHoverUpdate(() => {
                const t = k.time() * 10;
                card.color = k.hsl2rgb((t / 10) % 1, 0.6, 0.7);
                card.scale = k.vec2(1.05);
                k.setCursor("pointer");
            });
    
            // onHoverEnd() comes from area() component
            // it runs once when the object stopped being hovered
            card.onHoverEnd(() => {
                card.scale = k.vec2(1);
                card.color = k.rgb(255, 255, 255);
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
                        console.log("Update selected card!")
                        // Remove card concealer child.
                        destroyChildrenOfGameObject(card, "card-concealer")
                        // Display the card picture child.
                        card.add(createCardPicture());
                        // Set color of selected card and hover properties.
                        card.color = k.RED
                        card.onHoverUpdate(() => {
                            card.color = k.RED;
                            card.scale = k.vec2(1);
                        });
                        card.onHoverEnd(() => {
                            card.color = k.RED;
                            card.scale = k.vec2(1);
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
                            console.log("Two selected")
                            // Check if the two cards match. 
                            checkCardMatch()
                            no_of_cards_selected = 0
                            selected_cards_tags = []
                        }
                    }
                    console.log(selected_cards_tags)
                }
            });
    
            // Function to check if the two cards selected have matching tags.
        function checkCardMatch() {
    
            // Store the selected cards in local variables to capture their values in this scope
            const firstSelectedCardArrObj = selected_cards_tags[0];
            const secondSelectedCardArrObj = selected_cards_tags[1];
    
            // Check if the first card and second card selected have matching tags.
            if (firstSelectedCardArrObj.card_tag === secondSelectedCardArrObj.card_tag) {
                console.log("MATCHING!!!");
                // MATCHING cards.
                solvedPairsCnt += 1;
                k.get(firstSelectedCardArrObj.card_tag).forEach((e) => {
                    k.addKaboom(e.pos.sub(0, 50));
                    e.card_solved = true;
                    e.color = k.YELLOW;
                    e.onHoverUpdate(() => {
                        e.color = k.YELLOW;
                        e.scale = k.vec2(1.025);
                    });
                    e.onHoverEnd(() => {
                        e.color = k.YELLOW;
                        e.scale = k.vec2(1);
                    });
                });
            } else {
                console.log("NOT MATCHING!!!");
                // Pause for split seconds before resetting unmatched cards.
                k.wait(0.6, () => {
                    // Reset first selected card.
                    k.get(firstSelectedCardArrObj.unique_id_tag).forEach((e1) => {
                        resetCard(e1, firstSelectedCardArrObj.unique_id_tag);
                    });
                    // Reset second selected card.
                    k.get(secondSelectedCardArrObj.unique_id_tag).forEach((e2) => {
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
                card.color = k.rgb(255, 255, 255);
                card.onHoverUpdate(() => {
                    const t = k.time() * 10;
                    card.color = k.hsl2rgb((t / 10) % 1, 0.6, 0.7);
                    card.scale = k.vec2(1.05);
                    k.setCursor("pointer");
                });
                card.onHoverEnd(() => {
                    card.color = k.rgb(255, 255, 255);
                    card.scale = k.vec2(1);
                });
            }
    
            return card;
        }
    
    
    
        let solvedPairsCnt = 0
        let solvedPairsForWin = 1
        let no_of_cards_selected = 0;
        let selected_cards_tags = []
        addCard(k.vec2(200, 200), "bobo", "8556f3");
        addCard(k.vec2(400, 200), "apple", "384s2s83");
        addCard(k.vec2(600, 200), "butterfly", "3828ks3");
        addCard(k.vec2(800, 200), "meat", "3k828s3");
        addCard(k.vec2(200, 450), "note", "382ds83");
        addCard(k.vec2(400, 450), "grapes", "382w8k3");
        addCard(k.vec2(600, 450), "moon", "382s83");
        addCard(k.vec2(800, 450), "bean", "382a8k3");
        addCard(k.vec2(200, 700), "butterfly", "382dy83");
        addCard(k.vec2(400, 700), "grapes", "382yw83");
        addCard(k.vec2(600, 700), "note", "38j283");
        addCard(k.vec2(800, 700), "bobo", "3j82y83");
        addCard(k.vec2(200, 950), "bean", "382d8j3");
        addCard(k.vec2(400, 950), "apple", "382w83");
        addCard(k.vec2(600, 950), "meat", "38jk283");
        addCard(k.vec2(800, 950), "moon", "3828k3");
        });
    
        k.go("memory_match_board");
    
}