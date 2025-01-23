import { AudioPlay, GameObj, KAPLAYCtx } from "kaplay";
import { store, isShowingInfoTextAtom } from "../../store.ts";

export default function kettlebell_wok_room(k: KAPLAYCtx) {
  k.setBackground(k.BLACK);
  function getRandomNumber(): number {
    return Math.floor(Math.random() * 10);
  }
  const randomNum1: number = getRandomNumber();
  let ambient_music_sfx: AudioPlay = k.play("", {});
  let frieda_talk_Sfx: AudioPlay = k.play("", {});
  switch (randomNum1) {
    case 1:
      console.log("Random number1 is 1");
      ambient_music_sfx = k.play("slow_travel", { volume: 0.05, loop: true });
      break;
    case 2:
      console.log("Random number1 is 2");
      frieda_talk_Sfx = k.play("frieda_talk", { volume: 0.01, loop: true });
      break;
    case 3:
      console.log("Random number1 is 3");
      ambient_music_sfx = k.play("loading_biker", { volume: 0.05, loop: true });
      break;
    case 4:
      console.log("Random number1 is 4");
      ambient_music_sfx = k.play("loading_biker", { volume: 0.05, loop: true });
      frieda_talk_Sfx = k.play("frieda_talk", { volume: 0.01, loop: true });
      break;
    default:
      console.log("Random number1 is neither 1 nor 2");
      ambient_music_sfx = k.play("slow_travel", { volume: 0.05, loop: true });
      frieda_talk_Sfx = k.play("frieda_talk", { volume: 0.01, loop: true });
      break;
  }

  const randomNum2: number = getRandomNumber();
  let wok_room_backgroud: GameObj = k.add([]);
  switch (randomNum2) {
    case 1:
      console.log("Random number2 is 1");
      wok_room_backgroud = k.add([
        k.sprite("orange_neon_gym_bg"),
        k.pos(0, 300),
        k.scale(0.15),
      ]);
      break;
    case 2:
      console.log("Random number2 is 2");
      wok_room_backgroud = k.add([
        k.sprite("blue-neon-gym-2-bg"),
        k.pos(0, 300),
        k.scale(0.15),
      ]);
      break;
    default:
      console.log("Random number2 is neither 1 nor 2");
      wok_room_backgroud = k.add([
        k.sprite("blue-neon-gym-1-bg"),
        k.pos(0, 300),
        k.scale(0.15),
      ]);
      break;
  }

  k.add([k.sprite("kettlebell_woks"), k.pos(295, 410), k.scale(0.8)]);
  const info_sign_blue_neon_circle = k.add([
    k.sprite("neon_circle_blue"),
    k.pos(240, 430),
    k.scale(0.28),
    k.area(),
  ]);
  info_sign_blue_neon_circle.onHover(() => {
    // change cursor to pointer when hovering over button
    k.setCursor("pointer");
  });
  info_sign_blue_neon_circle.onHoverEnd(() => {
    // reset cursor to default when not hovering
    k.setCursor("default");
  });
  // Define the dialogue data [character, text, effects]
  const info_text: string[][] = [
    [
      "[red]The Big Picture[/red]\n[default]The ultimate goal is to complete 300 workouts over a two-year period while striving\nfor consistent improvement with each iteration of a workout, even if it's just by 1%.[small_default]\n (Click for more...)[/small_default][/default]",
    ],
    [
      "[red]How to use[/red]\n[default]Each week, you’ll receive four Kettlebell Complex workouts to tackle. Click on the four flickering monitors to view them.\nAt the start of each week, a new set of workouts will be introduced.[/default]",
    ],
    [
      "[default]Strive to complete every workout whenever possible. If that's not feasible, aim to finish as many as you can.[/default]",
    ],
    [
      "[default]After completing a workout, enter the required details on the workout sheet, such as time taken, reps completed, and kettlebell weight used.\n A score will then be calculated based on this information.[/default]",
    ],
    [
      "[default]When the workout comes up again, you'll see exactly what you need to do to improve your previous score—whether it's finishing faster or using a slightly heavier kettlebell.[/default]",
    ],
    [
      "[default]Every workout has a unique name and will reappear on a rotating schedule every few weeks.[/default]",
    ],
    // ["[default][/default]"],
    // ["[default][/default]"],
  ];

  // Text bubble
  info_sign_blue_neon_circle.onClick(() => {
    store.set(isShowingInfoTextAtom, true);
    let isRenderingInfoText: boolean = false;
    let curDialog: number = 0;
    const info_textbox: GameObj = k.add([
      k.rect(k.width() - 240, 240, { radius: 4 }),
      k.anchor("center"),
      k.pos(k.center().x, wok_room_backgroud.pos.y + 180),
      k.z(101),
      k.outline(4),
      k.area(),
    ]);
    info_textbox.onHover(() => {
      // change cursor to pointer when hovering over button
      k.setCursor("pointer");
    });
    info_textbox.onHoverEnd(() => {
      // reset cursor to default when not hovering
      k.setCursor("default");
    });
    const close_btn: GameObj = info_textbox.add([
      k.rect(40, 40, { radius: 4 }),
      k.anchor("center"),
      k.color(k.YELLOW),
      k.pos(-360, -140),
      k.z(101),
      k.outline(4),
      k.area(),
    ]);
    close_btn.add([
      k.text("X"),
      k.color(k.BLACK),
      k.anchor("center"),
      k.pos(0, 3),
    ]);
    close_btn.onClick(() => {
      store.set(isShowingInfoTextAtom, false);
      info_textbox.destroy();
      close_btn.destroy();
      txt.destroy();
    });
    close_btn.onHover(() => {
      // change cursor to pointer when hovering over button
      k.setCursor("pointer");
    });
    close_btn.onHoverEnd(() => {
      // reset cursor to default when not hovering
      k.setCursor("default");
    });
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
          small_default: {
            color: k.BLACK,
            scale: 0.5,
          },
        },
      }),
      k.pos(info_textbox.pos),
      k.anchor("center"),
      k.z(101),
      {
        letterCount: 0,
      },
    ]);
    info_textbox.onClick(() => {
      if (isRenderingInfoText) return;

      // Cycle through the dialogs
      curDialog = (curDialog + 1) % info_text.length;
      const [dialog] = info_text[curDialog];
      startWriting(dialog);
    });
    function startWriting(dialog: string) {
      isRenderingInfoText = true;
      txt.letterCount = 0;
      txt.text = dialog;

      const writing = k.loop(0.0175, () => {
        txt.letterCount = Math.min(
          txt.letterCount + 1,
          txt.renderedText.length
        );

        if (txt.letterCount === txt.renderedText.length) {
          isRenderingInfoText = false;
          writing.cancel();
        }
      });
    }
    const [dialog] = info_text[curDialog];
    startWriting(dialog);
  });

  k.add([k.sprite("neon_i_orange"), k.pos(247, 419), k.scale(0.6)]);

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
  ]);

  const frieda = k.add([
    k.sprite("frieda_idle", { anim: "idle" }),
    k.pos(855, 430),
    k.anchor("center"),
    k.scale(2.5),
    k.rotate(265),
  ]);
  const edamn = k.add([
    k.sprite("edamn-open", { anim: "idle" }),
    k.pos(960, 610),
    k.anchor("center"),
    k.scale(3.5),
  ]);
  edamn.flipX = true;
  const wok_screen1 = k.add([
    k.sprite("wok_screen", { anim: "idle" }),
    k.pos(300, 571),
    k.anchor("center"),
    k.scale(3),
    k.area(),
  ]);
  wok_screen1.flipX = true;

  const wok_screen2 = k.add([
    k.sprite("wok_screen", { anim: "idle" }),
    k.pos(416, 566),
    k.anchor("center"),
    k.scale(3),
    k.area(),
  ]);
  const wok_screen3 = k.add([
    k.sprite("wok_screen", { anim: "idle" }),
    k.pos(632, 570),
    k.anchor("center"),
    k.scale(3),
    k.area(),
  ]);
  const wok_screen4 = k.add([
    k.sprite("wok_screen", { anim: "idle" }),
    k.pos(750, 576),
    k.anchor("center"),
    k.scale(3),
    k.area(),
  ]);
  const scores_screen = k.add([
    k.sprite("scores_screen", { anim: "idle" }),
    k.pos(524, 535),
    k.anchor("center"),
    k.scale(3),
    k.area(),
  ]);
  wok_screen1.onClick(() => {
    if (store.get(isShowingInfoTextAtom)) return;
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
    if (store.get(isShowingInfoTextAtom)) return;
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
    if (store.get(isShowingInfoTextAtom)) return;
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
    if (store.get(isShowingInfoTextAtom)) return;
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
  wok_screen1.onHover(() => {
    if (store.get(isShowingInfoTextAtom)) return;
    // change cursor to pointer when hovering over button
    k.setCursor("pointer");
  });
  wok_screen1.onHoverEnd(() => {
    if (store.get(isShowingInfoTextAtom)) return;
    // reset cursor to default when not hovering
    k.setCursor("default");
  });
  wok_screen2.onHover(() => {
    if (store.get(isShowingInfoTextAtom)) return;
    // change cursor to pointer when hovering over button
    k.setCursor("pointer");
  });
  wok_screen2.onHoverEnd(() => {
    if (store.get(isShowingInfoTextAtom)) return;
    // reset cursor to default when not hovering
    k.setCursor("default");
  });
  wok_screen3.onHover(() => {
    if (store.get(isShowingInfoTextAtom)) return;
    // change cursor to pointer when hovering over button
    k.setCursor("pointer");
  });
  wok_screen3.onHoverEnd(() => {
    if (store.get(isShowingInfoTextAtom)) return;
    // reset cursor to default when not hovering
    k.setCursor("default");
  });
  wok_screen4.onHover(() => {
    if (store.get(isShowingInfoTextAtom)) return;
    // change cursor to pointer when hovering over button
    k.setCursor("pointer");
  });
  wok_screen4.onHoverEnd(() => {
    if (store.get(isShowingInfoTextAtom)) return;
    // reset cursor to default when not hovering
    k.setCursor("default");
  });
}
