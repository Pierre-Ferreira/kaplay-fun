import initKaplay from "../kaplayCtx";

export default function initGame() {
	const k = initKaplay();
	// @ts-check

	// kaplay();
	k.loadSprite("bean", "/sprites/bean.png");
	k.loadSound("score", "/examples/sounds/score.mp3");
	k.loadSound("wooosh", "/examples/sounds/wooosh.mp3");
	k.loadSound("hit", "/examples/sounds/hit.mp3");

	// define gravity
	k.setGravity(3200);
	k.scene("game", () => {
		const PIPE_OPEN = 440;
		const PIPE_MIN = 60;
		const JUMP_FORCE = 800;
		const SPEED = 920;
		const CEILING = -60;

		// a game object consists of a list of components and tags
		const bean = k.add([
			// sprite() means it's drawn with a sprite of name "bean" (defined above in 'loadSprite')
			k.sprite("bean"),
			// give it a position
			k.pos(k.width() / 4, 0),
			// give it a collider
			k.area(),
			// body component enables it to fall and jump in a gravity world
			k.body(),
		]);

		// check for fall death
		bean.onUpdate(() => {
			if (bean.pos.y >= k.height() || bean.pos.y <= CEILING) {
				// switch to "lose" scene
				k.go("lose", score);
			}
		});

		// jump
		k.onKeyPress("space", () => {
			bean.jump(JUMP_FORCE);
			k.play("wooosh");
		});

		k.onGamepadButtonPress("south", () => {
			bean.jump(JUMP_FORCE);
			k.play("wooosh");
		});

		// mobile
		k.onClick(() => {
			bean.jump(JUMP_FORCE);
			k.play("wooosh");
		});

		function spawnPipe() {
			// calculate pipe positions
			const h1 = k.rand(PIPE_MIN, k.height() - PIPE_MIN - PIPE_OPEN);
			const h2 = k.height() - h1 - PIPE_OPEN;

			k.add([
				k.pos(k.width(), 0),
				k.rect(64, h1),
				k.color(0, 127, 255),
				k.outline(4),
				k.area(),
				k.move(k.LEFT, SPEED),
				k.offscreen({ destroy: true }),
				// give it tags to easier define behaviors see below
				"pipe",
			]);

			k.add([
				k.pos(k.width(), h1 + PIPE_OPEN),
				k.rect(64, h2),
				k.color(0, 127, 255),
				k.outline(4),
				k.area(),
				k.move(k.LEFT, SPEED),
				k.offscreen({ destroy: true }),
				// give it tags to easier define behaviors see below
				"pipe",
				// raw obj just assigns every field to the game obj
				{ passed: false },
			]);
		}

		// callback when bean onCollide with objects with tag "pipe"
		bean.onCollide("pipe", () => {
			k.go("lose", score);
			k.play("hit");
			k.addKaboom(bean.pos);
		});

		// per frame event for all objects with tag 'pipe'
		k.onUpdate("pipe", (p) => {
			// check if bean passed the pipe
			if (p.pos.x + p.width <= bean.pos.x && p.passed === false) {
				addScore();
				p.passed = true;
			}
		});

		// spawn a pipe every 1 sec
		k.loop(1, () => {
			spawnPipe();
		});

		let score = 0;

		// display score
		const scoreLabel = k.add([k.text(score.toString()), k.anchor("center"), k.pos(k.width() / 2, 80), k.fixed(), k.z(100)]);

		function addScore() {
			score++;
			scoreLabel.text = score.toString();
			k.play("score");
		}
	});

	k.scene("lose", (score) => {
		k.add([k.sprite("bean"), k.pos(k.width() / 2, k.height() / 2 - 108), k.scale(3), k.anchor("center")]);

		// display score
		k.add([k.text(score), k.pos(k.width() / 2, k.height() / 2 + 108), k.scale(3), k.anchor("center")]);

		// go back to game with space is pressed
		k.onKeyPress("space", () => k.go("game"));
		k.onClick(() => k.go("game"));
	});

	k.go("game");
}
