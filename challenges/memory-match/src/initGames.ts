import initKaplay from "./kaplayCtx";

export default function initGame() {
    const k = initKaplay();
    k.setBackground(135, 62, 132);
    k.loadSprite("cardConcealer", "./sprites/k.png");
    // k.loadSprite("bean", "./sprites/cards/bean.png");
    // k.loadSprite("apple", "./sprites/cards/apple.png");
    // k.loadSprite("bobo", "./sprites/cards/bobo.png");
    // k.loadSprite("butterfly", "./sprites/cards/butterfly.png");
    // k.loadSprite("meat", "./sprites/cards/meat.png");
    // k.loadSprite("note", "./sprites/cards/note.png");
    // k.loadSprite("grapes", "./sprites/cards/grapes.png");
    // k.loadSprite("moon", "./sprites/cards/moon.png");

    k.scene("memory_match_board", () => {

        // reset cursor to default on frame start for easier cursor management.
        k.onUpdate(() => k.setCursor("default"));

        // Function to add a card.
        function addCard(p: any, card_tag: string, unique_id_tag: string) {
            const card_solved: boolean = false;
            const card_reveal_allowed: boolean = true;
            // add a card object
            const card = k.add([
                k.rect(110, 140, { radius: 8 }),
                k.pos(p),
                k.area(),
                k.scale(1),
                k.anchor("center"),
                k.outline(4),
                k.color(225, 225, 225),
                card_tag,
                unique_id_tag,
                {
                    card_solved,
                    card_reveal_allowed,
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
                    card.card_reveal_allowed = false;
                    // Check if the same card was clicked.
                    let notSameCardSelected = true;
                    if (selected_cards_tags[0] !== undefined) {
                        if (unique_id_tag === selected_cards_tags[0].unique_id_tag) {
                            notSameCardSelected = false;
                        }
                    }
                    // If the same card was not selected, then continue.
                    if (notSameCardSelected) {
                        //console.log("Update selected card!");
                        // Remove card concealer child.
                        destroyChildrenOfGameObject(card, "card-concealer");
                        // Display the card picture child.
                        card.add(createCardPicture());
                        // Set color of selected card and hover properties.
                        card.color = k.RED;
                        card.onHoverUpdate(() => {
                            card.color = k.RED;
                            card.scale = k.vec2(1);
                        });
                        card.onHoverEnd(() => {
                            card.color = k.RED;
                            card.scale = k.vec2(1);
                        });
    
                        // Create card object and push it to selected card array.
                        const cardObj = {
                            card_tag,
                            unique_id_tag,
                        };
                        selected_cards_tags.push(cardObj);
                        // Increase the number of cards selected.
                        no_of_cards_selected += 1;
                        // Check if two cards have been selected.
                        if (no_of_cards_selected >= 2) {
                            //console.log("Two selected");
                            // Check if the two cards match. 
                            checkCardMatch();
                            no_of_cards_selected = 0;
                            selected_cards_tags = [];
                        }
                        // Check if the game has been completed.
                        if (solvedPairsCnt === solvedPairsForWin) {
                            console.log("GAME COMPLETED!");
                        }
                    }
                    //console.log(selected_cards_tags);
                }
            });
    
            // Function to check if the two cards selected have matching tags.
            function checkCardMatch() {
    
                // Store the selected cards in local variables to capture their values in this scope
                const firstSelectedCardArrObj = selected_cards_tags[0];
                const secondSelectedCardArrObj = selected_cards_tags[1];
    
                // Check if the first card and second card selected have matching tags.
                if (firstSelectedCardArrObj.card_tag === secondSelectedCardArrObj.card_tag) {
                    //console.log("MATCHING!!!");
                    // MATCHING cards.
                    solvedPairsCnt += 1;
                    k.get(firstSelectedCardArrObj.card_tag).forEach((e: any) => {
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
                    //console.log("NOT MATCHING!!!");
                    // Pause for split seconds before resetting unmatched cards.
                    k.wait(0.6, () => {
                        // Reset first selected card.
                        k.get(firstSelectedCardArrObj.unique_id_tag).forEach((e1: any) => {
                            resetCard(e1, firstSelectedCardArrObj.unique_id_tag);
                        });
                        // Reset second selected card.
                        k.get(secondSelectedCardArrObj.unique_id_tag).forEach((e2: any) => {
                            resetCard(e2, secondSelectedCardArrObj.unique_id_tag);
                        });
                    });
                }
            }
    
            function destroyChildrenOfGameObject(gameObj: any, tag: string) {
                // Loop through the game objects children and destroy those that match the tag.
                gameObj.children.forEach((child: any) => {
                    if (child.is(tag)) {
                        child.destroy();
                    }
                });
            }
    
            function resetCard(card: any, tag: string) {
                // Destroy the card picture child.
                destroyChildrenOfGameObject(card, tag);
                // Add the card concealer child.
                card.add(createCardConcealer());
                // Allow card to be revealed again.
                card.card_reveal_allowed = true;
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
    
        const images = [
            "apple",
            "bag",
            "bean",
            "bobo",
            "butterfly",
            // "cloud",
            // "coin",
            // "egg",
            // "ghostiny",
            // "ghosty",
            // "gigagantrum",
            // "grapes",
            // "gun",
            // "heart",
            // "jump",
            // "key",
            // "lightning",
            // "mark",
            // "meat",
            // "moon",
            // "mushroom",
            // "note",
            // "pineapple",
            // "portal",
            // "spike",
            // "tga",
        ];
        
        let solvedPairsCnt: number = 0;
        const solvedPairsForWin: number = images.length;
        let no_of_cards_selected: number = 0;
        let selected_cards_tags: { card_tag: string; unique_id_tag: string }[] = [];
        interface Coordinates {
            x : number,
            y : number
        }
        const direction : "x-axis" | "y-axis" = "x-axis"
        const maxCardsInDirection : number = 6
        const x_offset : number = 140
        const y_offset : number = 160
        const x_start_pos : number = 200
        let x_pos : number = 0
        // const rowPosCnt : number = 0
        const y_start_pos : number = 200
        // const y_pos : number = 0
        const noOfImages : number = images.length
        const totalNoOfCards = noOfImages * 2
        const rowPos : number[] = []
        const xy_posArr : Coordinates[] = []
        let x : number = 0 
        let y : number = 0 
        let coordinates : Coordinates = {x:0,y:0}
        if (direction === "x-axis") {
            for(let x = 0; x < maxCardsInDirection; x++) {
                x_pos = x_start_pos + (x_offset * x)
                rowPos.push(x_pos)
            }
            for(let p = 0; p < totalNoOfCards; p++) {
                x = rowPos[p % maxCardsInDirection]
                y = ((Math.floor(p / maxCardsInDirection)) * y_offset) + y_start_pos
                coordinates = {
                    x: x,
                    y: y
                }
                // console.log(coordinates)
                xy_posArr.push(coordinates)
            }
            // console.log(xy_posArr)
        }
        let pickedCoordinates = []
        for (const image of images) {
            k.loadSprite(image, `./sprites/cards/${image}.png`);
            pickedCoordinates = pickAndRemoveTwo(xy_posArr)
            //console.log(pickedCoordinates)
            addCard(k.vec2(pickedCoordinates[0].x, pickedCoordinates[0].y), image, crypto.randomUUID());
            addCard(k.vec2(pickedCoordinates[1].x, pickedCoordinates[1].y), image, crypto.randomUUID());
        }   

        function pickAndRemoveTwo(arr: Coordinates[]) {
            let pickedItems = [];
    
            if (arr.length <= 2) {
            //   throw new Error("Array needs to have at least two elements.");
                pickedItems = [arr[0], arr[1]];
                return pickedItems;
            }
          
            // Get two unique random indices
            const index1 = Math.floor(Math.random() * arr.length);
            let index2;
            do {
              index2 = Math.floor(Math.random() * arr.length);
            } while (index2 === index1);
          
            // Get the elements at these indices
            pickedItems = [arr[index1], arr[index2]];
          
            // Remove items from array by index, starting from the larger index to avoid shifting
            arr.splice(Math.max(index1, index2), 1);
            arr.splice(Math.min(index1, index2), 1);
          
            return pickedItems;
          }
    });


    k.go("memory_match_board");
}
