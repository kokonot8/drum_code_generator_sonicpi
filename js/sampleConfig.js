// 列举乐器类别，每个类别包含多个采样，每个采样有标签和音频文件路径和sonic pi中的采样名
const instrumentCategories = [
    {
        name: "Kick",
        samples: [
            { label: "808 Kick", audio: "sounds/bd_808.flac", sample: ":bd_808" },
            { label: "Ada Kick", audio: "sounds/bd_ada.flac", sample: ":bd_ada" },
            { label: "Haus Kick", audio: "sounds/bd_haus.flac", sample: ":bd_haus" },
            { label: "Pure Kick", audio: "sounds/bd_pure.flac", sample: ":bd_pure" },
            { label: "Zum Kick", audio: "sounds/bd_zum.flac", sample: ":bd_zum" },
            { label: "Gas Kick", audio: "sounds/bd_gas.flac", sample: ":bd_gas" },
            { label: "Sone Kick", audio: "sounds/bd_sone.flac", sample: ":bd_sone" },
            { label: "Zome Kick", audio: "sounds/bd_zome.flac", sample: ":bd_zome" },
            { label: "Boom Kick", audio: "sounds/bd_boom.flac", sample: ":bd_boom" },
            { label: "Klub Kick", audio: "sounds/bd_klub.flac", sample: ":bd_klub" },
            { label: "Fat Kick", audio: "sounds/bd_fat.flac", sample: ":bd_fat" },
            { label: "Tek Kick", audio: "sounds/bd_tek.flac", sample: ":bd_tek" },
            { label: "Mehackit Kick", audio: "sounds/bd_mehackit.flac", sample: ":bd_mehackit" },
            { label: "Chip Kick", audio: "sounds/bd_chip.flac", sample: ":bd_chip" },
            { label: "Jazz Kick", audio: "sounds/bd_jazz.flac", sample: ":bd_jazz" }
        ]
    },
    {
        name: "Snare",
        samples: [
            { label: "Dub Snare", audio: "sounds/sn_dub.flac", sample: ":sn_dub" },
            { label: "Dolf Snare", audio: "sounds/sn_dolf.flac", sample: ":sn_dolf" },
            { label: "Zome Snare", audio: "sounds/sn_zome.flac", sample: ":sn_zome" },
            { label: "Generic Snare", audio: "sounds/sn_generic.flac", sample: ":sn_generic" }
        ]
    },
    {
        name: "Hi-Hat",
        samples: [
            { label: "Closed Cymbal", audio: "sounds/drum_cymbal_closed.flac", sample: ":drum_cymbal_closed" },
            { label: "Open Cymbal", audio: "sounds/drum_cymbal_open.flac", sample: ":drum_cymbal_open" },
            { label: "Pedal Cymbal", audio: "sounds/drum_cymbal_pedal.flac", sample: ":drum_cymbal_pedal" },
            { label: "Soft Cymbal", audio: "sounds/drum_cymbal_soft.flac", sample: ":drum_cymbal_soft" },
            { label: "Hard Cymbal", audio: "sounds/drum_cymbal_hard.flac", sample: ":drum_cymbal_hard" },
            { label: "Snap Hat", audio: "sounds/hat_snap.flac", sample: ":hat_snap" },
            { label: "Tap Hat", audio: "sounds/hat_tap.flac", sample: ":hat_tap" },
            { label: "Cats Hat", audio: "sounds/hat_cats.flac", sample: ":hat_cats" },
            { label: "Bdu Hat", audio: "sounds/hat_bdu.flac", sample: ":hat_bdu" },
            { label: "Psych Hat", audio: "sounds/hat_psych.flac", sample: ":hat_psych" },
            { label: "Zild Hat", audio: "sounds/hat_zild.flac", sample: ":hat_zild" },
            { label: "Zap Hat", audio: "sounds/hat_zap.flac", sample: ":hat_zap" }
        ]
    },
    {
        name: "Clap",
        samples: [
            { label: "Snap", audio: "sounds/perc_snap.flac", sample: ":perc_snap" },
            { label: "Snap2", audio: "sounds/perc_snap2.flac", sample: ":perc_snap2" }
        ]
    },
    {
        name: "Percussion",
        samples: [
            { label: "Bell", audio: "sounds/perc_bell.flac", sample: ":perc_bell" },
            { label: "Bell2", audio: "sounds/perc_bell2.flac", sample: ":perc_bell2" },
            { label: "Swash", audio: "sounds/perc_swash.flac", sample: ":perc_swash" },
            { label: "Till", audio: "sounds/perc_till.flac", sample: ":perc_till" },
            { label: "Door", audio: "sounds/perc_door.flac", sample: ":perc_door" },
            { label: "Impact1", audio: "sounds/perc_impact1.flac", sample: ":perc_impact1" },
            { label: "Impact2", audio: "sounds/perc_impact2.flac", sample: ":perc_impact2" },
            { label: "Swoosh", audio: "sounds/perc_swoosh.flac", sample: ":perc_swoosh" }
        ]
    },
    {
        name: "Bass",
        samples: [
            { label: "Hit Bass", audio: "sounds/bass_hit_c.flac", sample: ":bass_hit_c" },
            { label: "Hard Bass", audio: "sounds/bass_hard_c.flac", sample: ":bass_hard_c" },
            { label: "Thick Bass", audio: "sounds/bass_thick_c.flac", sample: ":bass_thick_c" },
            { label: "Trance Bass", audio: "sounds/bass_trance_c.flac", sample: ":bass_trance_c" },
            { label: "Drop Bass", audio: "sounds/bass_drop_c.flac", sample: ":bass_drop_c" },
            { label: "Woodsy Bass", audio: "sounds/bass_woodsy_c.flac", sample: ":bass_woodsy_c" },
            { label: "Voxy Bass", audio: "sounds/bass_voxy_c.flac", sample: ":bass_voxy_c" },
            { label: "Voxy Hit Bass", audio: "sounds/bass_voxy_hit_c.flac", sample: ":bass_voxy_hit_c" },
            { label: "DnB Bass", audio: "sounds/bass_dnb_f.flac", sample: ":bass_dnb_f" }
        ]
    },
    {
        name: "Tom",
        samples: [
            { label: "Mid Soft Tom", audio: "sounds/drum_tom_mid_soft.flac", sample: ":drum_tom_mid_soft" },
            { label: "Mid Hard Tom", audio: "sounds/drum_tom_mid_hard.flac", sample: ":drum_tom_mid_hard" },
            { label: "Lo Soft Tom", audio: "sounds/drum_tom_lo_soft.flac", sample: ":drum_tom_lo_soft" },
            { label: "Lo Hard Tom", audio: "sounds/drum_tom_lo_hard.flac", sample: ":drum_tom_lo_hard" },
            { label: "Hi Soft Tom", audio: "sounds/drum_tom_hi_soft.flac", sample: ":drum_tom_hi_soft" },
            { label: "Hi Hard Tom", audio: "sounds/drum_tom_hi_hard.flac", sample: ":drum_tom_hi_hard" }
        ]
    },
    {
        name: "Ride",
        samples: [
            { label: "Tri Ride", audio: "sounds/ride_tri.flac", sample: ":ride_tri" },
            { label: "Via Ride", audio: "sounds/ride_via.flac", sample: ":ride_via" }
        ]
    },
    {
        name: "Cymbal",
        samples: [
            { label: "Splash Soft", audio: "sounds/drum_splash_soft.flac", sample: ":drum_splash_soft" },
            { label: "Splash Hard", audio: "sounds/drum_splash_hard.flac", sample: ":drum_splash_hard" }
        ]
    },
    {
        name: "Cowbell",
        samples: [
            { label: "Cowbell", audio: "sounds/drum_cowbell.flac", sample: ":drum_cowbell" }
        ]
    },
    {
        name: "Roll",
        samples: [
            { label: "Roll", audio: "sounds/drum_roll.flac", sample: ":drum_roll" }
        ]
    }
];