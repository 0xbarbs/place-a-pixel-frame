/** @jsxImportSource frog/jsx */
import { PixelGrid } from "@/components/PixelGrid";
import { Button, TextInput } from "frog";
import { coordinateToString, getAllPixelColors, parseCoordinate } from "@/utils/pixels";
import { PIXELS_X, PIXELS_Y } from "@/constants";

export const SuccessFrame = async (c: any) => {
  const colors = await getAllPixelColors();

  return c.res({
    image: (
      <div
        style={{
          display: "flex",
          position: "relative",
        }}
      >
        <PixelGrid
          colors={colors}
          showGrid={false}
          highlightedPixel={null}
        />

        <div
          style={{
            display: "flex",
            position: "absolute",
            bottom: 32,
            background: "#b4ebb0",
            padding: 16,
            textAlign: "center",
            border: "5px solid green",
            justifySelf: "center",
            left: "50%",
            maxWidth: 1100,
            transform: "translateX(-50%)",
            boxSizing: "border-box",
          }}
        >
          <p
            style={{
              margin: 0,
              fontFamily: "VT323",
              fontSize: 40,
            }}
          >
            Your pixel was painted!
          </p>
        </div>
      </div>
    ),
    intents: [
      <Button action="/canvas">🔄 Restart</Button>
    ],
  });
}