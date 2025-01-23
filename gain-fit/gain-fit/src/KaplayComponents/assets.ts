// import initKaplay from "../kaplayCtx";

export default function loadAssets(k) {
  //   const k = initKaplay();
  k.loadSprite(
    "blue-neon-gym-1-bg",
    "graphics/Backgrounds/Blue_neon_gym_1_bg.jpg"
  );

  k.loadSprite("kettlebell_woks", "graphics/Signs/Kettlebell_WOKs.png");
  k.loadSprite("neon_circle_blue", "graphics/Signs/Neon_circle_blue.webp");
  k.loadSprite("neon_i_orange", "graphics/Signs/Neon_i_orange.png");

  k.loadSprite("biker_idle", "graphics/Biker/Biker_idle_yellow.png", {
    sliceX: 4,
    sliceY: 1,
    anims: {
      idle: {
        from: 0,
        to: 3,
        loop: true, // loop animation
        speed: 5,
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

  k.loadSprite("scores_screen", "graphics/Monitors/Screen1_cust3.png", {
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

  k.loadSprite("wok_screen", "graphics/Monitors/Screen2.png", {
    sliceX: 4,
    sliceY: 1,
    anims: {
      idle: {
        from: 0,
        to: 3,
        loop: true, // loop animation
        speed: 3,
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

  k.loadSound("frieda_talk", "sounds/Frieda_talk.wav");
  k.loadSound("loading_biker", "sounds/Loading_biker.wav");
  k.loadSound("slow_travel", "sounds/Slow_travel.wav");
  k.loadSprite("default_cursor", "graphics/Cursors/Neon_cursor.png", {
    sliceX: 2,
    sliceY: 1,
    anims: {
      idle: {
        from: 0,
        to: 0,
      },
    },
  });
  k.loadSprite("grab_cursor", "graphics/Cursors/Neon_cursor.png", {
    sliceX: 2,
    sliceY: 1,
    anims: {
      idle: {
        from: 1,
        to: 1,
      },
    },
  });
}
