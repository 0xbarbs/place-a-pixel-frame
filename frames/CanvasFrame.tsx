/** @jsxImportSource frog/jsx */
import { PixelGrid } from "@/components/PixelGrid";
import { Button } from "frog";
import { getAllPixelColors } from "@/utils/pixels";

export const CanvasFrame = async (c: any) => {
  const colors = await getAllPixelColors();

  return c.res({
    image: (
      <PixelGrid
        colors={colors}
        showGrid={false}
        highlightedPixel={null}
      />
    ),
    intents: [
      <Button value="refresh">🔄 Refresh</Button>,
      <Button action="/select">🔎 Select a pixel</Button>
    ],
  });
}