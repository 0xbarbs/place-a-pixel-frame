/** @jsxImportSource frog/jsx */
import { CanvasRenderingContext2D, createCanvas } from "canvas";
import { Coordinate } from "@/types/canvas";
import { FRAME_HEIGHT, FRAME_WIDTH, PIXEL_SCALE, PIXELS_X, PIXELS_Y } from "@/constants";

export const PixelGrid = ({
  colors,
  showGrid,
  highlightedPixel,
}: {
  colors: string[];
  showGrid: boolean;
  highlightedPixel: Coordinate | null;
}) => {
  const canvas = createCanvas(FRAME_WIDTH, FRAME_HEIGHT)
  const ctx = canvas.getContext('2d')

  drawPixels(ctx, colors);
  {showGrid && drawGrid(ctx)}
  {highlightedPixel && highlightPixel(ctx, highlightedPixel)}

  return <img alt="pixel art canvas" style={{ width: "1200px", height: "630px" }} src={canvas.toDataURL()} />;
};

export const highlightPixel = (ctx: CanvasRenderingContext2D, position: Coordinate): void => {
  const { x, y } = position;
  ctx.strokeStyle = 'black';
  ctx.lineWidth = 5;
  ctx.strokeRect((x - 1) * PIXEL_SCALE, (y - 1) * PIXEL_SCALE, PIXEL_SCALE, PIXEL_SCALE);
};

export const drawGrid = (ctx: CanvasRenderingContext2D): void => {
  ctx.lineWidth = 10;
  const spacing = 5 * PIXEL_SCALE; // Change this value as needed

  // horizontal
  for (let y = spacing; y < FRAME_HEIGHT; y += spacing) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(FRAME_WIDTH, y);
    ctx.stroke();
  }

  // vertical
  for (let x = spacing; x < FRAME_WIDTH; x += spacing) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, FRAME_HEIGHT);
    ctx.stroke();
  }
};

const drawPixels = (ctx: CanvasRenderingContext2D, colors: string[]): void => {
  for (let w = 0; w < PIXELS_X; w++) {
    for (let h = 0; h < PIXELS_Y; h++) {
      const index = w + (h * PIXELS_X);

      // ctx.fillStyle = '#'+(Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0');
      ctx.fillStyle = colors[index];
      ctx.fillRect(w * PIXEL_SCALE, h * PIXEL_SCALE, PIXEL_SCALE, PIXEL_SCALE);
    }
  }
};