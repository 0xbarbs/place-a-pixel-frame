import { ColorCode, Coordinate } from "@/types/canvas";
import { CODE_COLORS, COLOR_CODES, FRAME_HEIGHT, FRAME_WIDTH, PIXELS_X, PIXELS_Y } from "@/constants";
import { kv } from "@vercel/kv";
import { bo } from "@upstash/redis/zmscore-b6b93f14";

export const parseCoordinate = (text: string | undefined): Coordinate | null => {
  if (!text) {
    return null;
  }

  const coordinateRegex = /^\s*(-?\d+)\s*,\s*(-?\d+)\s*$/;
  const match = text.match(coordinateRegex);
  if (match) {
    const x = parseInt(match[1]);
    const y = parseInt(match[2]);
    return { x, y };
  }

  return null;
}

export const isValidColorCode = (code: string): boolean => {
  return /[0-9A-F]/.test(code);
}

export const coordinateToString = (coord: Coordinate): string => {
  return `${coord.x},${coord.y}`;
}

export const setAllPixelColors = async (color: ColorCode) => {
  const totalPixels = FRAME_WIDTH * FRAME_HEIGHT;
  return kv.set("pap:canvas", color.repeat(totalPixels)); // @vercel/kv doesnt support bitfield?!
}

export const getAllPixelColors = async (): Promise<string[]> => {
  let colors: string[] = [];
  const canvas = await kv.get("pap:canvas") as string;
  for (let i = 0; i < canvas.length; i++) {
    const code = canvas[i];
    const color = CODE_COLORS[code as ColorCode];

    if (!color) {
      console.warn("invalid color code detected: ", code);
    } else {
      colors.push(color);
    }
  }

  return colors;
}

export const setPixelColor = async (position: Coordinate, code: ColorCode) => {
  console.log("setting pixel color: ", { position, code });
  const colors = await getAllPixelColors();
  const index = (position.x - 1) + ((position.y - 1) * PIXELS_X);
  colors[index] = CODE_COLORS[code];
  await savePixelColors(colors);
}

const savePixelColors = async (colors: string[]) => {
  let canvas = "";
  colors.forEach((color) => canvas += COLOR_CODES[color]);
  await kv.set("pap:canvas", canvas);

  const paintCount = (await kv.get("pap:count") || 0) as number;
  if (paintCount > 0 && paintCount % 840) {
    await kv.set(`pap:nft:${paintCount / 840}`, canvas);
  }
  await kv.incr("pap:count");
}