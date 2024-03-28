/** @jsxImportSource frog/jsx */
import { Button, TextInput } from "frog";
import { FRAME_HEIGHT, FRAME_WIDTH, PAINT_THROTTLE } from "@/constants";

export const FaqFrame = async (c: any) => {
  return c.res({
    image: (
      <div
        style={{
          display: "flex",
          width: FRAME_WIDTH,
          height: FRAME_HEIGHT,
          background: "#6e83ec",
          padding: "16px 32px",
          flexDirection: "column",
        }}
      >
        <h1
          style={{
            alignSelf: "center",
            color: "white",
            fontFamily: "VT323",
            fontSize: 80,
            textDecoration: "underline",
            marginBottom: 32,
          }}
        >
          How it works
        </h1>

        <p
          style={{
            color: "white",
            fontFamily: "VT323",
            fontSize: 50,
          }}
        >
          1️⃣ The canvas is made up of 840 pixels (40 x 21)
        </p>
        <p
          style={{
            color: "white",
            fontFamily: "VT323",
            fontSize: 50,
          }}
        >
          2️⃣ Each user can place 1 pixel every {PAINT_THROTTLE} seconds
        </p>
        <p
          style={{
            color: "white",
            fontFamily: "VT323",
            fontSize: 50,
          }}
        >
          3️⃣ Pick the X and Y coordinate of the pixel to paint
        </p>

        <p
          style={{
            color: "white",
            fontFamily: "VT323",
            fontSize: 50,
          }}
        >
          4️⃣ Confirm and select the pixels new color
        </p>

        <p
          style={{
            color: "white",
            fontFamily: "VT323",
            fontSize: 50,
          }}
        >
          5️⃣ Every 840 pixels placed will create a new canvas NFT
        </p>
      </div>
    ),
    intents: [
      <Button.Reset>⬅️ Back</Button.Reset>,

    ],
  });
}