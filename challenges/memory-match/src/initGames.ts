import { GameObj, Vec2 } from "kaplay";
import initKaplay from "./kaplayCtx";
import { store, cntDoomCounterAtom } from "./store";

export default function initGame() {
	const k = initKaplay();
	k.setBackground(135, 62, 132);
	k.loadSprite("cardConcealer", "/icons/cluesified-icon-main.png");
	// k.loadFont("samarin", "fonts/samarin.tff");

	k.scene(
		"memory_match_game",
		(
			maxCardsInRow: number,
			infoBoardPos: Vec2,
			infoBoardSize: Vec2,
			gameBoardPos: Vec2,
			gameBoardSize: Vec2,
			cardsBoardSize: Vec2,
			cardSize: Vec2,
			x_spaces,
			y_spaces
		) => {
			// reset cursor to default on frame start for easier cursor management.
			k.onUpdate(() => k.setCursor("default"));

			// Add the Infoboard.
			const infoBoard: GameObj = k.add([
				k.rect(infoBoardSize.x, infoBoardSize.y, { radius: 8 }),
				k.pos(infoBoardPos),
				k.area(),
				k.scale(1),
				k.anchor("center"),
				k.outline(4, k.YELLOW),
				k.color(0, 0, 0),
				"infoboard",
			]);
			const doomCounter: GameObj = infoBoard.add([
				k.text("DOOM IN:", {
					size: 30,
					// font: "samarin",
				}),
				k.anchor("center"),
			]);
			doomCounter.onUpdate(() => {
				doomCounter.text = `DOOM IN: ${cntDoomCounter}`;
				// doomCounter.font = "starborn";
			});

			// Add the Gameboard.
			const gameBoard = k.add([
				k.rect(gameBoardSize.x, gameBoardSize.y, { radius: 8 }),
				k.pos(gameBoardPos),
				k.area(),
				k.scale(1),
				k.anchor("center"),
				k.outline(4, k.YELLOW),
				k.color(0, 0, 0),
				"gameboard",
			]);

			// Add a card display board.
			const cardsBoard = gameBoard.add([
				k.rect(cardsBoardSize.x, cardsBoardSize.y, { radius: 8 }),
				k.pos(),
				k.area(),
				k.scale(1),
				k.anchor("center"),
				k.opacity(0),
				"cardsboard",
			]);
			// Function to add a card.
			function addCard(
				cardPos: Vec2,
				card_tag: string,
				unique_id_tag: string,
				cardSize: Vec2,
				cardGlobalPos: Vec2
			): void {
				const card_solved: boolean = false;
				const card_reveal_allowed: boolean = true;
				// add a card object
				const card: GameObj = cardsBoard.add([
					k.rect(cardSize.x, cardSize.y, { radius: 8 }),
					k.pos(cardPos),
					k.area(),
					k.scale(1),
					k.anchor("center"),
					k.outline(4),
					k.color(225, 225, 225),
					card_tag,
					unique_id_tag,
					"cards",
					{
						card_solved,
						card_reveal_allowed,
						cardGlobalPos,
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
					}
				});

				// Function to check if the two cards selected have matching tags.
				function checkCardMatch() {
					// Store the selected cards in local variables to capture their values in this scope
					const firstSelectedCardArrObj = selected_cards_tags[0];
					const secondSelectedCardArrObj = selected_cards_tags[1];

					// Check if the first card and second card selected have matching tags.
					if (
						firstSelectedCardArrObj.card_tag ===
						secondSelectedCardArrObj.card_tag
					) {
						// console.log("MATCHING!!!");
						// MATCHING cards.
						solvedPairsCnt += 1;
						cardsBoard
							.get(firstSelectedCardArrObj.card_tag)
							.forEach((e: GameObj) => {
								k.addKaboom(k.vec2(e.cardGlobalPos.x, e.cardGlobalPos.y));
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
						// console.log("NOT MATCHING!!!");
						//Update Doom Counter.
						cntDoomCounter -= 1;
						store.set(cntDoomCounterAtom, cntDoomCounter);
						// Pause for split seconds before resetting unmatched cards.
						k.wait(0.6, () => {
							// Reset first selected card.
							cardsBoard
								.get(firstSelectedCardArrObj.unique_id_tag)
								.forEach((e1: GameObj) => {
									resetCard(e1, firstSelectedCardArrObj.unique_id_tag);
								});
							// Reset second selected card.
							cardsBoard
								.get(secondSelectedCardArrObj.unique_id_tag)
								.forEach((e2: GameObj) => {
									resetCard(e2, secondSelectedCardArrObj.unique_id_tag);
								});
						});
					}
				}

				function destroyChildrenOfGameObject(gameObj: GameObj, tag: string) {
					// Loop through the game objects children and destroy those that match the tag.
					gameObj.children.forEach((child: GameObj) => {
						if (child.is(tag)) {
							child.destroy();
						}
					});
				}

				function resetCard(card: GameObj, tag: string) {
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
			}

			// Function to setup x-coordinates of card positions.
			interface x_CoordinatesOfCardsSetupOptions {
				maxCardsInRow: number;
				x_start_pos: number;
				x_offset: number;
			}

			function x_CoordinatesOfCardsSetup({
				maxCardsInRow,
				x_start_pos,
				x_offset,
			}: x_CoordinatesOfCardsSetupOptions): number[] {
				let x_pos: number = 0;
				const x_CoordinatesArray: number[] = [];
				for (let x = 0; x < maxCardsInRow; x++) {
					x_pos = x_start_pos + x_offset * x;
					x_CoordinatesArray.push(x_pos);
				}
				return x_CoordinatesArray;
			}

			// Function to create xy-coordinated of all the cards
			interface xy_CooridinatesOfCardsSetupOptions {
				totalNoOfCards: number;
				maxCardsInRow: number;
				x_CoordinatesArray: number[];
				y_start_pos: number;
				y_offset: number;
			}

			function xy_CooridinatesOfCardsSetup({
				x_CoordinatesArray,
				totalNoOfCards,
				maxCardsInRow,
				y_start_pos,
				y_offset,
			}: xy_CooridinatesOfCardsSetupOptions): Coordinates[] {
				let coordinates: Coordinates = { x: 0, y: 0 };
				let y: number = 0;
				let x: number = 0;
				const xy_posArr: Coordinates[] = [];
				for (let p = 0; p < totalNoOfCards; p++) {
					x = x_CoordinatesArray[p % maxCardsInRow];
					y = Math.floor(p / maxCardsInRow) * y_offset + y_start_pos;
					coordinates = {
						x,
						y,
					};
					xy_posArr.push(coordinates);
				}
				return xy_posArr;
			}

			// Function to display Card on screen
			interface displayCardsOptions {
				images: string[];
				xy_PostionArray: Coordinates[];
			}
			function displayCards({
				images,
				xy_PostionArray,
			}: displayCardsOptions): void {
				let pickedCoordinates = [];
				for (const image of images) {
					k.loadSprite(image, `./sprites/cards/${image}.png`);
					pickedCoordinates = pickAndRemoveTwo(xy_PostionArray);
					const cardGlobalPos_0: Vec2 = k.vec2(
						gameBoard.pos.x + pickedCoordinates[0].x,
						gameBoard.pos.y + pickedCoordinates[0].y
					);
					const cardGlobalPos_1: Vec2 = k.vec2(
						gameBoard.pos.x + pickedCoordinates[1].x,
						gameBoard.pos.y + pickedCoordinates[1].y
					);
					addCard(
						k.vec2(pickedCoordinates[0].x, pickedCoordinates[0].y),
						image,
						crypto.randomUUID(),
						cardSize,
						cardGlobalPos_0
					);
					addCard(
						k.vec2(pickedCoordinates[1].x, pickedCoordinates[1].y),
						image,
						crypto.randomUUID(),
						cardSize,
						cardGlobalPos_1
					);
				}
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

			interface Coordinates {
				x: number;
				y: number;
			}
			// const maxCardsInRow: number = 4;
			// Setup the x-coordinates of the card positions.
			const x_CoordinatesArr: number[] = x_CoordinatesOfCardsSetup({
				maxCardsInRow,
				x_start_pos: 0 - cardsBoardSize.x / 2 + cardSize.x / 2,
				x_offset: cardSize.x + x_spaces,
			});
			const noOfImages: number = images.length;
			// Setup the xy coordinates of all the card.
			const xy_PostionArray: Coordinates[] = xy_CooridinatesOfCardsSetup({
				totalNoOfCards: noOfImages * 2,
				maxCardsInRow,
				x_CoordinatesArray: x_CoordinatesArr,
				y_start_pos: 0 - cardsBoardSize.y / 2 + cardSize.y / 2,
				y_offset: cardSize.y + y_spaces,
			});
			// Display all the cards.
			displayCards({ images, xy_PostionArray });
		}
	);

	const images: string[] = [
		"apple",
		"pineapple",
		"bean",
		"palm_tree",
		"gigagantrum",
		"eben-etzebeth",
		// "siya-kolisi",
		// "dolphin",
		// "bag",
		// "michael_scott",
		// "bobo",
		// "cloud",
		// "natal-sharks",
		// "coin",
		// "egg",
		// "ghostiny",
		// "ghosty",
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
		// "portal",
		// "spike",
		// "tga",
	];
	// Initiate game variables.
	let cntDoomCounter: number = 9;
	let solvedPairsCnt: number = 0;
	const solvedPairsForWin: number = images.length;
	let no_of_cards_selected: number = 0;
	let selected_cards_tags: { card_tag: string; unique_id_tag: string }[] = [];
	const maxCardsInRow: number = 4;
	const cardSize: Vec2 = k.vec2(110, 140);
	const infoBoardPos: Vec2 = k.vec2(500, 65);
	const infoBoardSize: Vec2 = k.vec2(900, 100);
	const gameBoardPos: Vec2 = k.vec2(500, 500);
	const gameBoardSize: Vec2 = k.vec2(900, 700);
	const x_spaces: number = 30;
	const y_spaces: number = 20;
	const totalCardRows: number = Math.floor((images.length * 2) / maxCardsInRow);
	const cardsBoardWidth: number =
		maxCardsInRow * (cardSize.x + x_spaces) - x_spaces;
	const cardsBoardHeight: number =
		totalCardRows * (cardSize.y + y_spaces) - y_spaces;
	const cardsBoardSize: Vec2 = k.vec2(cardsBoardWidth, cardsBoardHeight);

	k.go(
		"memory_match_game",
		maxCardsInRow,
		infoBoardPos,
		infoBoardSize,
		gameBoardPos,
		gameBoardSize,
		cardsBoardSize,
		cardSize,
		x_spaces,
		y_spaces
	);
}
