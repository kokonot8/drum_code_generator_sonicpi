const drumPresets = {
 electro: {
  bpm: 128,
  instruments: [
    { category: 0, sample: 0 }, // 808 Kick
    { category: 1, sample: 0 }, // Dub Snare
    { category: 2, sample: 0 }, // Closed Cymbal
    { category: 3, sample: 0 }  // Snap Clap
  ],
  grid: [
    [true, false, false, false, true, false, false, false, true, false, false, false, true, false, false, false], // Kick
    [false, false, true, false, false, false, true, false, false, false, true, false, false, false, true, false], // Snare
    [true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false], // HiHat
    [false, false, false, false, false, false, false, false, false, false, true, false, false, false, false, false] // Clap
  ]
},
bossa: {
  bpm: 94,
  instruments: [
    { category: 0, sample: 14 }, // Jazz Kick
    { category: 1, sample: 3 },  // Generic Snare
    { category: 2, sample: 0 },  // Closed Cymbal
    { category: 3, sample: 0 }   // Snap Clap
  ],
  grid: [
    [true, false, false, false, false, false, true, false, false, false, false, false, true, false, false, false], // Kick
    [false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false], // Snare
    [true, false, false, true, true, false, false, true, true, false, false, true, true, false, false, true], // HiHat
    [false, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false] // Clap
  ]
},
funk: {
  bpm: 100,
  instruments: [
    { category: 0, sample: 11 }, // Tek Kick
    { category: 1, sample: 1 },  // Dolf Snare
    { category: 2, sample: 5 },  // Snap Hat
    { category: 3, sample: 0 }   // Snap Clap
  ],
  grid: [
    [true, false, false, true, false, false, true, false, true, false, false, true, false, false, true, false], // Kick
    [false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false], // Snare
    [true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false], // Hat
    [false, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false] // Clap
  ]
}

};
