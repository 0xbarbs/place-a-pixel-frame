/** @jsxImportSource frog/jsx */
import { Button } from "frog";
import { FRAME_HEIGHT, FRAME_WIDTH } from "@/constants";

export const HomeFrame = async (c: any) => {
  return c.res({
    image: (
      <div
        style={{
          display: "flex",
          width: FRAME_WIDTH,
          height: FRAME_HEIGHT,
          background: "#6e83ec",
          flexDirection: "column",
          padding: 16,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            display: "flex"
          }}
        >
          <div
            style={{
              display: "flex",
              width: 500,
              height: 500,
              imageRendering: "pixelated",
              backgroundSize: "100% 100%",
              backgroundImage: `url(${process.env.NEXT_PUBLIC_URL!}/palette.png)`,
            }}
          />

          <h1
            style={{
              color: "white",
              fontFamily: "VT323",
              fontSize: 200,
              width: 600,
              marginTop: 32,
            }}
          >
            Place a pixel
          </h1>
        </div>

        <p
          style={{
            color: "white",
            fontFamily: "VT323",
            fontSize: 80,
          }}
        >
          A community art experiment
        </p>
      </div>
    ),
    intents: [
      <Button action="/faq">FAQ ❓</Button>,
      <Button action="/canvas">🎨 View canvas</Button>,
    ],
  });
}