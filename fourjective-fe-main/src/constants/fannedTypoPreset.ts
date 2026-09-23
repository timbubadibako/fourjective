/**
 * LOCKED 4JECTIV TYPOGRAPHY PRESET
 * Tuned directly by user via 4jectiv Tuning Studio on 2026-09-18.
 * Ready for React / TypeScript integration.
 */

export interface FannedLetterConfig {
  char: string;
  baseRot: number;     // Tilt angle in degrees (-30 to +30)
  yOffset: number;     // Vertical displacement in px (-80 to +80)
  xOffset: number;     // Horizontal kerning/displacement in px (-60 to +60)
  fanSpread: number;   // Multiplier for paper layer fanning distance
  layerRot: number;    // Rotation delta step per paper layer (degrees)
  dx: number;          // Projection horizontal vector per layer (px)
  dy: number;          // Projection vertical vector per layer (px)
}

export interface FannedTypoPreset {
  type: string;
  presetName: string;
  text: string;
  font: 'unbounded' | 'rubik' | 'dela' | 'paytone' | 'syne';
  colorMode: 'multi' | 'pink' | 'orange';
  global: {
    fanSpread: number;
    letterSpacing: number;
    layerRot: number;
  };
  letters: FannedLetterConfig[];
}

export const LOCKED_4JECTIV_PRESET: FannedTypoPreset = {
  type: "4JECTIV_TYPO_PRESET",
  presetName: "Custom 4jectiv Tuning",
  text: "4JECTIV",
  font: "unbounded",
  colorMode: "multi",
  global: {
    fanSpread: 2.5,
    letterSpacing: 0,
    layerRot: -0.5
  },
  letters: [
    {
      char: "4",
      baseRot: 9.5,
      yOffset: -80,
      xOffset: -20,
      fanSpread: 1.55,
      layerRot: 0.5,
      dx: 5.4,
      dy: 1
    },
    {
      char: "J",
      baseRot: -2,
      yOffset: 80,
      xOffset: -18,
      fanSpread: 0.95,
      layerRot: 3,
      dx: -4.5,
      dy: 6.5
    },
    {
      char: "E",
      baseRot: -9,
      yOffset: -80,
      xOffset: -8,
      fanSpread: 1,
      layerRot: -1.7,
      dx: -3.6,
      dy: 8.4
    },
    {
      char: "C",
      baseRot: -17.5,
      yOffset: 80,
      xOffset: -14,
      fanSpread: 1.25,
      layerRot: -5,
      dx: -2,
      dy: 5.8
    },
    {
      char: "T",
      baseRot: 10.5,
      yOffset: -41,
      xOffset: -60,
      fanSpread: 1.3,
      layerRot: -2.6,
      dx: 6,
      dy: 4
    },
    {
      char: "I",
      baseRot: -17.5,
      yOffset: 80,
      xOffset: 20,
      fanSpread: 1.4,
      layerRot: -0.8,
      dx: -3.4,
      dy: 6.2
    },
    {
      char: "V",
      baseRot: 2,
      yOffset: -80,
      xOffset: -39,
      fanSpread: 1.6,
      layerRot: -2.1,
      dx: 2,
      dy: 4.6
    }
  ]
};

export default LOCKED_4JECTIV_PRESET;
