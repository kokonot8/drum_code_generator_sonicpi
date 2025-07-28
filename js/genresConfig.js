const drumPresets = {
  classic: {
    bpm: 120,
    instruments: [
      { category: 0, sample: 0 },  // 808 Kick
      { category: 1, sample: 0 },  // Dub Snare
      { category: 2, sample: 0 },  // Closed Cymbal
      { category: 3, sample: 0 }   // Snap Clap
    ],
    grid: [
      [true, false, false, false, true, false, false, false, true, false, false, false, true, false, false, false], // Kick 在每拍头（稳重）
      [false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false], // Snare 在第2、4
      [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true],           // Closed‑Hat 全拍
      [false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false]  // Clap 跟 Snare 同步
    ]
    // 特点：标准流行/舞曲节奏—Kick on 1/5/9/13，Snare on 5/13，Hi‑Hat 每步，Clap on 5/13
  },


  house_four_on_floor: {
    bpm: 124,
    instruments: [
      { category: 0, sample: 2 }, // Haus Kick
      { category: 1, sample: 3 }, // Generic Snare
      { category: 2, sample: 1 }, // Open Cymbal
      { category: 4, sample: 6 }  // Impact2 FX
    ],
    grid: [
      [true, false, false, false, true, false, false, false, true, false, false, false, true, false, false, false], // 四击 Kick
      [false, false, false, false, false, false, false, false, false, false, true, false, false, false, false, false], // Snare 小改动第11
      [false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true], // 开 Cymbal 每拍 off‑beat
      [false, false, false, false, false, false, false, false, false, false, false, false, true, false, false, false] // FX 在 build‑up 时触发
    ]
    // 特点：House 4/4 Kick 稳定，中间略微变换 Snare 带变化
  },

  dnb_half_time: {
    bpm: 174,
    instruments: [
      { category: 0, sample: 11 }, // Tek Kick
      { category: 1, sample: 1 },  // Dolf Snare
      { category: 2, sample: 0 },  // Closed Cymbal
      { category: 5, sample: 8 }   // DnB Bass（作为 FX 轨道也可）
    ],
    grid: [
      [true, false, false, false, true, false, false, true, false, false, true, false, false, true, false, false], // Kick half‑time feel
      [false, false, true, false, false, false, true, false, false, false, true, false, false, false, true, false], // Snare 倒拍
      [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true],           // Hats 密集
      [true, false, false, false, false, false, true, false, false, false, false, false, true, false, false, false]  // Bass 重拍补充
    ]
    // 特点：DnB 半拍感主导结构，Kick 每两拍一次，Snare 异步滑动
  },

  how_sweet: {
    bpm: 102,
    instruments: [
      { category: 0, sample: 0 }, // 808 Kick
      { category: 1, sample: 0 }, // Dub Snare
      { category: 2, sample: 5 }, // Snap Hat
      { category: 3, sample: 0 }  // Snap Clap
    ],
    grid: [
      // Kick 主要点缀，突出1和第9步，轻微点在第13步做变化
      [true, false, false, false, false, false, false, false, true, false, false, false, true, false, false, false], 
      // Snare 典型弱拍，出现在5和13，保持松弛感
      [false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false],
      // Snap Hat 规律16分音符，但留空第8和16步，制造呼吸感
      [true, true, true, true, true, true, false, true, true, true, true, true, true, true, false, true],
      // Snap Clap 用于弱拍5和13，呼应snare
      [false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false]
    ]
    // 注释：节奏简单不拥挤，snap hat有呼吸，kick有点缀感，snare/clap强调弱拍，整体松弛而有律动感。
 }
};
