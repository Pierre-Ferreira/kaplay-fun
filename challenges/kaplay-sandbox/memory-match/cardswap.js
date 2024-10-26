kaplay();


  loadSprite("cardFront", "/sprites/bean.png");
  loadSprite("cardBack", "/sprites/ghosty.png");

  // Add the card to the screen
  const card = add([
    sprite("cardBack"), // Start with the back of the card
    pos(320, 180),
    anchor("center"),
    scale(1),
  ]);
  
// Track the current sprite state
let isSpriteOne = true;

// Function to swap sprites
function swapSprite() {
  if (isSpriteOne) {
    card.use(sprite("cardFront"));
  } else {
    card.use(sprite("cardBack"));
  }
  isSpriteOne = !isSpriteOne; // Toggle the state
}

// Add a click event to trigger the swap
card.onMousePress(() => {
  swapSprite();
});