import { GameObj, Vec2 } from "kaplay";
import initKaplay from "../kaplayCtx";
import { store, cntDoomCounterAtom, solvedPairsForWinAtom } from "../store";
import addCard from "./addCard";

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
			x_spaces: number,
			y_spaces: number,
			images: string[]
			// cntDoomCounter: number
		) => {
			// reset cursor to default on frame start for easier cursor management.
			k.onUpdate(() => k.setCursor("default"));

			// const selected_cards_tags: { card_tag: string; unique_id_tag: string }[] =
			// 	[];
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
				const cntDoomCounter: number = store.get(cntDoomCounterAtom);
				doomCounter.text = `DOOM IN: ${cntDoomCounter}`;
				// doomCounter.font = "starborn";
			});

			// Add the Gameboard.
			const gameBoard: GameObj = k.add([
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
			const cardsBoard: GameObj = gameBoard.add([
				k.rect(cardsBoardSize.x, cardsBoardSize.y, { radius: 8 }),
				k.pos(),
				k.area(),
				k.scale(1),
				k.anchor("center"),
				k.opacity(0),
				"cardsboard",
			]);

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
						cardGlobalPos_0,
						cardsBoard,
						k
						// selected_cards_tags
						// no_of_cards_selected,
						// solvedPairsCnt,
						// solvedPairsForWin,
						// cntDoomCounter
					);
					addCard(
						k.vec2(pickedCoordinates[1].x, pickedCoordinates[1].y),
						image,
						crypto.randomUUID(),
						cardSize,
						cardGlobalPos_1,
						cardsBoard,
						k
						// selected_cards_tags
						// no_of_cards_selected,
						// solvedPairsCnt,
						// solvedPairsForWin,
						// cntDoomCounter
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
		"siya-kolisi",
		"dolphin",
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
	const cntDoomCounter: number = 9;
	store.set(cntDoomCounterAtom, cntDoomCounter);

	// const solvedPairsCnt: number = 0;
	const solvedPairsForWin: number = images.length;
	store.set(solvedPairsForWinAtom, solvedPairsForWin);
	// const no_of_cards_selected: number = 0;

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
		y_spaces,
		images
		// cntDoomCounter
	);
}
