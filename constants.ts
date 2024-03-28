import { ColorCode } from "@/types/canvas";

export const FRAME_WIDTH = 1200;
export const FRAME_HEIGHT = 630;
export const PIXEL_SCALE = 30;

export const PIXELS_X = FRAME_WIDTH / PIXEL_SCALE;
export const PIXELS_Y = FRAME_HEIGHT / PIXEL_SCALE;

export const CODE_COLORS: Record<ColorCode, string> = {
  0: "#222222",
  1: "#FFFFFF",
  2: "#808196",
  3: "#aec1d2",
  4: "#9cadff",
  5: "#465493",
  6: "#b88dda",
  7: "#6a3e8d",
  8: "#fda9c0",
  9: "#b94075",
  A: "#ffe3b3",
  B: "#da7879",
  C: "#fee563",
  D: "#ee6e31",
  E: "#8affa7",
  F: "#1d4e3a",
};

export const COLOR_CODES: Record<string, ColorCode> = {
  "#222222": "0",
  "#FFFFFF": "1",
  "#808196": "2",
  "#aec1d2": "3",
  "#9cadff": "4",
  "#465493": "5",
  "#b88dda": "6",
  "#6a3e8d": "7",
  "#fda9c0": "8",
  "#b94075": "9",
  "#ffe3b3": "A",
  "#da7879": "B",
  "#fee563": "C",
  "#ee6e31": "D",
  "#8affa7": "E",
  "#1d4e3a": "F",
};