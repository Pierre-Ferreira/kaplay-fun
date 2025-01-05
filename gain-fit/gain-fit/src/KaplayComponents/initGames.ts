import initKaplay from "../kaplayCtx";
// import testing-stuff from "./scenes/testing-stuff.ts";

export default function initGame() {
  const k = initKaplay();
  k.loadSprite(
    "blue-neon-gym-1-bg",
    "graphics/backgrounds/blue-neon-gym-1-bg.jpg"
  );

  k.loadSprite("biker_idle", "graphics/Biker/Biker_idle.png", {
    sliceX: 4,
    sliceY: 1,
    anims: {
      idle: {
        from: 0,
        to: 3,
        loop: true, // loop animation
        speed: 4,
      },
    },
  });

  k.loadSprite("biker_idle2", "graphics/Biker/Biker_Idle2.png", {
    sliceX: 6,
    sliceY: 1,
    anims: {
      idle: {
        from: 0,
        to: 5,
        // loop: true, // loop animation
        pingpong: true,
        speed: 4,
      },
    },
  });

  k.loadSprite("punk_idle", "graphics/Punk/Punk_idle.png", {
    sliceX: 4,
    sliceY: 1,
    anims: {
      idle: {
        from: 0,
        to: 3,
        loop: true, // loop animation
        speed: 4,
      },
    },
  });

  k.loadSprite("cyborg_idle", "graphics/Cyborg/Cyborg_idle.png", {
    sliceX: 4,
    sliceY: 1,
    anims: {
      idle: {
        from: 0,
        to: 3,
        loop: true, // loop animation
        speed: 4,
      },
    },
  });

  k.loadSprite("frieda_idle", "graphics/Frieda/Idle.png", {
    sliceX: 4,
    sliceY: 1,
    anims: {
      idle: {
        from: 0,
        to: 3,
        loop: true, // loop animation
        speed: 4,
      },
    },
  });

  k.loadSprite("edamn-open", "graphics/EDAMN/EDAMN-open.png", {
    sliceX: 1,
    sliceY: 1,
    anims: {
      idle: {
        from: 0,
        to: 0,
        loop: true, // loop animation
        speed: 4,
      },
    },
  });

  k.scene("testing-stuff", () => {
    k.add([k.sprite("blue-neon-gym-1-bg"), k.pos(0, 300), k.scale(0.15)]);
    const punk1 = k.add([
      k.sprite("punk_idle", { anim: "idle" }),
      k.pos(80, 480),
      // k.origin("center"),
      k.scale(4),
      // k.rotate(45),
      // k.color(0, 0, 1),
      // k.layer("ui"),
    ]);
    const cyborg1 = k.add([
      k.sprite("cyborg_idle", { anim: "idle" }),
      k.pos(380, 480),
      // k.origin("center"),
      k.scale(4),
      // k.rotate(45),
      // k.color(0, 0, 1),
      // k.layer("ui"),
    ]);
    const biker1 = k.add([
      k.sprite("biker_idle", { anim: "idle" }),
      k.pos(180, 490),
      // k.origin("center"),
      k.scale(4),
      // k.rotate(45),
      // k.color(0, 0, 1),
      // k.layer("ui"),
    ]);
    biker1.flipX = true;
    const biker2 = k.add([
      k.sprite("biker_idle2", { anim: "idle" }),
      k.pos(500, 490),
      // k.origin("center"),
      k.scale(4),
      // k.rotate(45),
      // k.color(0, 0, 1),
      // k.layer("ui"),
    ]);
    const frieda = k.add([
      k.sprite("frieda_idle", { anim: "idle" }),
      k.pos(855, 430),
      k.anchor("center"),
      k.scale(2.5),
      k.rotate(265),
      // k.color(0, 0, 1),
      // k.layer("ui"),
    ]);
    const edamn = k.add([
      k.sprite("edamn-open", { anim: "idle" }),
      k.pos(942, 590),
      k.anchor("center"),
      k.scale(3.5),
      // k.rotate(265),
      // k.color(0, 0, 1),
      // k.layer("ui"),
    ]);
    edamn.flipX = true;
  });

  k.go("testing-stuff");
}
