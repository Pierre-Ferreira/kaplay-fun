import { GameObj } from "kaplay";
import initKaplay from "../kaplayCtx";
// import testing-stuff from "./scenes/testing-stuff.ts";

export default function initGame() {
  const k = initKaplay();
  k.setBackground(k.BLACK);
  k.loadSprite(
    "blue-neon-gym-1-bg",
    "graphics/Backgrounds/Blue_neon_gym_1_bg.jpg"
  );

  k.loadSprite("kettlebell_woks", "graphics/Signs/Kettlebell_WOKs.png");
  k.loadSprite("neon_circle_blue", "graphics/Signs/Neon_circle_blue.webp");
  k.loadSprite("neon_i_orange", "graphics/Signs/Neon_i_orange.png");

  k.loadSprite("biker_idle", "graphics/Biker/Biker_idle.png", {
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

  k.scene("testing-stuff", () => {
    const slow_travel_sfx = k.play("slow_travel", { volume: 0.05, loop: true });
    const frieda_talk_Sfx = k.play("frieda_talk", { volume: 0.01, loop: true });
    const wok_room_backgroud = k.add([
      k.sprite("blue-neon-gym-1-bg"),
      k.pos(0, 300),
      k.scale(0.15),
    ]);
    k.add([k.sprite("kettlebell_woks"), k.pos(295, 410), k.scale(0.8)]);
    const info_sign_blue_neon_circle = k.add([
      k.sprite("neon_circle_blue"),
      k.pos(240, 430),
      k.scale(0.28),
      k.area(),
    ]);
    info_sign_blue_neon_circle.onHover((c) => {
      // change cursor to pointer when hovering over button
      k.setCursor("pointer");
    });
    info_sign_blue_neon_circle.onHoverEnd((c) => {
      // reset cursor to default when not hovering
      k.setCursor("default");
    });
    // Define the dialogue data [character, text, effects]
    const info_text: string[][] = [
      ["[default]Oh hi![/default][red]COOL[/red]"],
      ["[default]Hey! That's my line![/default]"],
      // ["[default]What! Mark??? How did you get here?[/default]"],
      // [
      //   "[default]Ohhi! I'm just here to say that[/default] [kaboom]Kaboom.js[/kaboom] [default]is awesome![/default]",
      // ],
      // [
      //   "[default]Yes but... Nobody uses[/default] [kaboom]Kaboom.js[/kaboom] [default]anymore![/default]",
      // ],
      // ["[surprised]What? Why?[/surprised]", "shake"],
      // ["[default]Full compatibilty with[/default] [kaboom]Kaboom.js![/kaboom]"],
      // ["[default]So, what are you waiting for?[/default]"],
      // ["[default]Go and try it now![/default]"],
    ];

    // Text bubble
    info_sign_blue_neon_circle.onClick(() => {
      let isTalking: boolean = false;
      let curDialog: number = 0;
      const info_textbox: GameObj = k.add([
        k.rect(k.width() - 240, 240, { radius: 4 }),
        k.anchor("center"),
        k.pos(k.center().x, wok_room_backgroud.pos.y + 180),
        k.outline(4),
        k.area(),
      ]);
      // Text
      const txt: GameObj = k.add([
        k.text("", {
          size: 32,
          width: info_textbox.width,
          align: "center",
          font: "Sans-Serif",
          styles: {
            default: {
              color: k.BLACK,
            },
            red: {
              color: k.RED,
            },
            // kaplay: (idx, ch) => ({
            //   color: Color.fromHex("#6bc96c"),
            //   pos: vec2(0, wave(-4, 4, time() * 6 + idx * 0.5)),
            // }),
            // kaboom: (idx, ch) => ({
            //   color: Color.fromHex("#ff004d"),
            //   pos: vec2(0, wave(-4, 4, time() * 4 + idx * 0.5)),
            //   scale: wave(1, 1.2, time() * 3 + idx),
            //   angle: wave(-9, 9, time() * 3 + idx),
            // }),
            // // a jump effect
            // surprised: (idx, ch) => ({
            //   color: Color.fromHex("#8465ec"),
            //   scale: wave(1, 1.2, time() * 1 + idx),
            //   pos: vec2(0, wave(0, 4, time() * 10)),
            // }),
            // hot: (idx, ch) => ({
            //   color: Color.fromHex("#ff004d"),
            //   scale: wave(1, 1.2, time() * 3 + idx),
            //   angle: wave(-9, 9, time() * 3 + idx),
            // }),
          },
          // transform: (idx, ch) => {
          //   return {
          //     opacity: idx < txt.letterCount ? 1 : 0,
          //   };
          // },
        }),
        k.pos(info_textbox.pos),
        k.anchor("center"),
        {
          letterCount: 0,
        },
      ]);
      info_textbox.onClick(() => {
        if (isTalking) return;

        // Cycle through the dialogs
        curDialog = (curDialog + 1) % info_text.length;
        const [dialog, eff] = info_text[curDialog];
        startWriting(dialog);
      });
      function startWriting(dialog) {
        isTalking = true;
        txt.letterCount = 0;
        txt.text = dialog;

        const writing = k.loop(0.0175, () => {
          txt.letterCount = Math.min(
            txt.letterCount + 1,
            txt.renderedText.length
          );

          if (txt.letterCount === txt.renderedText.length) {
            isTalking = false;
            writing.cancel();
          }
        });
      }
      const [dialog, eff] = info_text[curDialog];
      startWriting(dialog);
    });

    k.add([k.sprite("neon_i_orange"), k.pos(247, 419), k.scale(0.6)]);
    // const punk1 = k.add([
    //   k.sprite("punk_idle", { anim: "idle" }),
    //   k.pos(80, 480),
    //   // k.origin("center"),
    //   k.scale(4),
    //   // k.rotate(45),
    //   // k.color(0, 0, 1),
    //   // k.layer("ui"),
    // ]);
    // const cyborg1 = k.add([
    //   k.sprite("cyborg_idle", { anim: "idle" }),
    //   k.pos(380, 480),
    //   // k.origin("center"),
    //   k.scale(4),
    //   // k.rotate(45),
    //   // k.color(0, 0, 1),
    //   // k.layer("ui"),
    // ]);
    // const biker1 = k.add([
    //   k.sprite("biker_idle", { anim: "idle" }),
    //   k.pos(180, 490),
    //   // k.origin("center"),
    //   k.scale(4),
    //   // k.rotate(45),
    //   // k.color(0, 0, 1),
    //   // k.layer("ui"),
    // ]);
    // biker1.flipX = true;
    const biker2 = k.add([
      k.sprite("biker_idle", { anim: "idle" }),
      k.pos(180, 590),
      // k.origin("center"),
      k.anchor("center"),
      k.scale(4),
      k.z(100),
      k.timer(),
      k.area(),
      k.body,
      k.animate(),
      "biker2",
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
      k.pos(960, 610),
      k.anchor("center"),
      k.scale(3.5),
      // k.rotate(265),
      // k.color(0, 0, 1),
      // k.layer("ui"),
    ]);
    edamn.flipX = true;
    const wok_screen1 = k.add([
      k.sprite("wok_screen", { anim: "idle" }),
      k.pos(300, 571),
      k.anchor("center"),
      k.scale(3),
      k.area(),
      // k.rotate(265),
      // k.color(0, 0, 1),
      // k.layer("ui"),
    ]);
    wok_screen1.flipX = true;

    const wok_screen2 = k.add([
      k.sprite("wok_screen", { anim: "idle" }),
      k.pos(416, 566),
      k.anchor("center"),
      k.scale(3),
      k.area(),
      // k.rotate(265),
      // k.color(0, 0, 1),
      // k.layer("ui"),
    ]);
    const wok_screen3 = k.add([
      k.sprite("wok_screen", { anim: "idle" }),
      k.pos(632, 570),
      k.anchor("center"),
      k.scale(3),
      k.area(),
      // k.rotate(265),
      // k.color(0, 0, 1),
      // k.layer("ui"),
    ]);
    const wok_screen4 = k.add([
      k.sprite("wok_screen", { anim: "idle" }),
      k.pos(750, 576),
      k.anchor("center"),
      k.scale(3),
      k.area(),
      // k.rotate(265),
      // k.color(0, 0, 1),
      // k.layer("ui"),
    ]);
    const scores_screen = k.add([
      k.sprite("scores_screen", { anim: "idle" }),
      k.pos(524, 535),
      k.anchor("center"),
      k.scale(3),
      k.area(),
      // k.rotate(265),
      // k.color(0, 0, 1),
      // k.layer("ui"),
    ]);
    wok_screen1.onClick(() => {
      biker2.animate(
        "pos",
        [
          k.vec2(biker2.pos.x, biker2.pos.y),
          // k.vec2(250, 590),
          k.vec2(wok_screen1.pos.x, wok_screen1.pos.y - 15),
        ],
        {
          duration: 2,
          // timing: [0, 2 / 8, 1],
          // direction: "ping-pong",
          loops: 1,
        }
      );
    });
    wok_screen2.onClick(() => {
      biker2.animate(
        "pos",
        [
          k.vec2(biker2.pos.x, biker2.pos.y),
          // k.vec2(250, 590),
          k.vec2(wok_screen2.pos.x, wok_screen2.pos.y - 15),
        ],
        {
          duration: 2,
          // timing: [0, 2 / 8, 1],
          // direction: "ping-pong",
          loops: 1,
        }
      );
    });
    wok_screen3.onClick(() => {
      biker2.animate(
        "pos",
        [
          k.vec2(biker2.pos.x, biker2.pos.y),
          // k.vec2(250, 590),
          k.vec2(wok_screen3.pos.x, wok_screen3.pos.y - 15),
        ],
        {
          duration: 2,
          // timing: [0, 2 / 8, 1],
          // direction: "ping-pong",
          loops: 1,
        }
      );
    });
    wok_screen4.onClick(() => {
      biker2.animate(
        "pos",
        [
          k.vec2(biker2.pos.x, biker2.pos.y),
          // k.vec2(250, 590),
          k.vec2(wok_screen4.pos.x, wok_screen4.pos.y - 15),
        ],
        {
          duration: 2,
          // timing: [0, 2 / 8, 1],
          // direction: "ping-pong",
          loops: 1,
        }
      );
    });
    wok_screen1.onHover((c) => {
      // change cursor to pointer when hovering over button
      k.setCursor("pointer");
    });
    wok_screen1.onHoverEnd((c) => {
      // reset cursor to default when not hovering
      k.setCursor("default");
    });
    wok_screen2.onHover((c) => {
      // change cursor to pointer when hovering over button
      k.setCursor("pointer");
    });
    wok_screen2.onHoverEnd((c) => {
      // reset cursor to default when not hovering
      k.setCursor("default");
    });
    wok_screen3.onHover((c) => {
      // change cursor to pointer when hovering over button
      k.setCursor("pointer");
    });
    wok_screen3.onHoverEnd((c) => {
      // reset cursor to default when not hovering
      k.setCursor("default");
    });
    wok_screen4.onHover((c) => {
      // change cursor to pointer when hovering over button
      k.setCursor("pointer");
    });
    wok_screen4.onHoverEnd((c) => {
      // reset cursor to default when not hovering
      k.setCursor("default");
    });
  });

  // // wok_screen4.onHover(() => {
  // //   cursor.sprite = "grab_cursor";
  // // });

  // // wok_screen4.onHoverEnd(() => {
  // //   cursor.sprite = "default_cursor";
  // // });
  // // Set the layers, the cursor will be on top of everything, "ui"
  // k.layers(["game", "ui"], "game");

  // // We create the object that will emulate the OS mouse
  // const cursor = k.add([
  //   k.sprite("default_cursor"),
  //   k.pos(),
  //   k.layer("ui"),
  //   k.scale(0.05),
  //   // The fakeMouse() component will make it movable with a real mouse
  //   k.fakeMouse({
  //     followMouse: true, // disable if you want
  //   }),
  // ]);

  // k.setCursor("none"); // Hide the real mouse
  // // Mouse movement with the keyboard
  // const MOUSE_VEL = 200;
  // cursor.onKeyDown("left", () => {
  //   cursor.move(-MOUSE_VEL, 0);
  // });

  // cursor.onKeyDown("right", () => {
  //   cursor.move(MOUSE_VEL, 0);
  // });

  // cursor.onKeyDown("up", () => {
  //   cursor.move(0, -MOUSE_VEL);
  // });

  // cursor.onKeyDown("down", () => {
  //   cursor.move(0, MOUSE_VEL);
  // });
  k.go("testing-stuff");
}
