import {
	store,
	cntDoomCounterAtom,
	noOfCardsSelectedAtom,
	solvedPairsCntAtom,
	solvedPairsForWinAtom,
	selectedCardsTagsAtom,
	isRoundCompletedAtom,
} from "../store";
import { GameObj, KAPLAYCtx, Vec2 } from "kaplay";

// Function to add a card.
export default function addCard(
	cardPos: Vec2,
	card_tag: string,
	unique_id_tag: string,
	cardSize: Vec2,
	cardGlobalPos: Vec2,
	cardsBoard: GameObj,
	k: KAPLAYCtx
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
			"card-picture",
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
		const isRoundCompleted = store.get(isRoundCompletedAtom);
		console.log("isRoundCompleted: ", isRoundCompleted);
		// If round is completed (win or fail) prevent any card clicks.
		if (!isRoundCompleted) {
			// Only continue if the card is not solved and card is allowed to be revealed.
			if (!card.card_solved && card.card_reveal_allowed) {
				// Prevent card from being reveal, until reset of card.
				card.card_reveal_allowed = false;
				// Check if the same card was clicked.
				let notSameCardSelected = true;
				let selected_cards_tags: {
					card_tag: string;
					unique_id_tag: string;
				}[] = [];
				selected_cards_tags = store.get(selectedCardsTagsAtom);
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
					let no_of_cards_selected: number = store.get(noOfCardsSelectedAtom);
					no_of_cards_selected += 1;
					store.set(noOfCardsSelectedAtom, no_of_cards_selected);
					// Check if two cards have been selected.
					if (no_of_cards_selected >= 2) {
						// Check if the two cards match.
						checkCardMatch(selected_cards_tags, cardsBoard);
						no_of_cards_selected = 0;
						store.set(noOfCardsSelectedAtom, no_of_cards_selected);
						selected_cards_tags = [];
						store.set(selectedCardsTagsAtom, []);
					} else {
						k.play("select-card");
					}
				}
			}
		}
	});

	// Function to check if the two cards selected have matching tags.
	function checkCardMatch(
		selected_cards_tags: { card_tag: string; unique_id_tag: string }[],
		cardsBoard: GameObj
	) {
		// Store the selected cards in local variables to capture their values in this scope
		const firstSelectedCardArrObj = selected_cards_tags[0];
		const secondSelectedCardArrObj = selected_cards_tags[1];

		// Check if the first card and second card selected have matching tags.
		if (
			firstSelectedCardArrObj.card_tag === secondSelectedCardArrObj.card_tag
		) {
			console.log("MATCHING!!!");
			// MATCHING cards.
			k.play("matching-cards");
			let solvedPairsCnt: number = store.get(solvedPairsCntAtom);
			solvedPairsCnt += 1;
			store.set(solvedPairsCntAtom, solvedPairsCnt);
			cardsBoard.get(firstSelectedCardArrObj.card_tag).forEach((e: GameObj) => {
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
			console.log("NOT MATCHING!!!");
			k.play("select-card");
			k.play("deselect-card");
			//Update Doom Counter.
			let cntDoomCounter: number = store.get(cntDoomCounterAtom);
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
