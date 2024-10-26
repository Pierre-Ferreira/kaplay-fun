kaplay();


  loadSprite("cardFront", "/sprites/bean.png");
  loadSprite("cardBack", "/sprites/ghosty.png");
//   // Load card sprites for front and back
//   loadSprite("cardFront", "path/to/cardFront.png");
//   loadSprite("cardBack", "path/to/cardBack.png");
  
  // Add the card to the screen
  const card = add([
    sprite("cardBack"), // Start with the back of the card
    pos(320, 180),
    anchor("center"),
    scale(1),
  ]);

// State to track if the card is flipped
let isFlipped = false;

// Function to flip the card
function flipCard() {
  // Animate the scale for the flipping effect
  tween(card.scale.x, -1, 0.3, (newScaleX) => {
    card.scale.x = newScaleX;
  });

  // Change the sprite halfway through the flip
  wait(0.15, () => {
    card.use(sprite(isFlipped ? "cardBack" : "cardFront"));
    isFlipped = !isFlipped;
  });
}

// Add a click event to the card to trigger the flip
card.onMousePress(() => {
  flipCard();
});