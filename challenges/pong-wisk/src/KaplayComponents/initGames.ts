import initKaplay from "../kaplayCtx";

export default function initGame() {
	const k = initKaplay();
	// @ts-check

	k.setBackground(255, 255, 128);
	k.scene("pong-wisk-game", () => {
		// add paddles
		k.add([k.pos(40, 0), k.rect(20, 80), k.outline(4), k.anchor("center"), k.area(), "paddle"]);

		k.add([k.pos(k.width() - 40, 0), k.rect(20, 80), k.outline(4), k.anchor("center"), k.area(), "paddle"]);

		// move paddles with mouse
		k.onUpdate("paddle", (p) => {
			p.pos.y = k.mousePos().y;
		});

		// score counter
		let score = 0;

		k.add([
			k.text(score.toString()),
			k.pos(k.center()),
			k.anchor("center"),
			k.z(50),
			{
				update() {
					this.text = score.toString();
				},
			},
		]);

		// ball
		let speed = 480;

		const ball = k.add([
			k.pos(k.center()),
			k.circle(80),
			k.outline(4),
			k.area({ shape: new k.Rect(k.vec2(-80), 160, 160) }),
			{ vel: k.Vec2.fromAngle(k.rand(-20, 20)) },
		]);

		// move ball, bounce it when touche horizontal edges, respawn when touch vertical edges
		ball.onUpdate(() => {
			ball.move(ball.vel.scale(speed));
			if (ball.pos.x < 0 || ball.pos.x > k.width()) {
				score = 0;
				ball.pos = k.center();
				ball.vel = k.Vec2.fromAngle(k.rand(-20, 20));
				speed = 480;
				// ball.radius = 80;
				// ball.area = { shape: new k.Rect(k.vec2(-80), 160, 160) };
			}
			if (ball.pos.y < 0 || ball.pos.y > k.height()) {
				ball.vel.y = -ball.vel.y;
			}
		});

		// bounce when touch paddle
		ball.onCollide("paddle", (p) => {
			speed += 60;
			const min_radius = 10;
			let smaller_radius = ball.radius - ball.radius * 0.1;
			if (smaller_radius < min_radius) {
				smaller_radius = min_radius;
			}
			ball.radius = smaller_radius;
			// ball.area = {
			// 	shape: new k.Rect(k.vec2(-smaller_radius), smaller_radius * 2, smaller_radius * 2),
			// 	scale: k.vec2(),
			// 	offset: k.vec2(),
			// 	cursor: null,
			// };
			ball.vel = k.Vec2.fromAngle(ball.pos.angle(p.pos));
			score++;
		});
	});

	console.log("Start game.");
	k.go("pong-wisk-game");
}
