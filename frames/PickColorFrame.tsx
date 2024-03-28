/** @jsxImportSource frog/jsx */
import { Button, TextInput } from "frog";
import { CODE_COLORS, FRAME_HEIGHT, FRAME_WIDTH } from "@/constants";
import { coordinateToString, isValidColorCode, parseCoordinate, setPixelColor } from "@/utils/pixels";
import { ErrorFrame } from "@/frames/ErrorFrame";
import { CanvasFrame } from "@/frames/CanvasFrame";
import { SuccessFrame } from "@/frames/SuccessFrame";
import { getInteractor } from "@/utils/neynar";
import { kv } from "@vercel/kv";
import { getUnixTimestamp } from "@/utils/date";
import { ColorCode } from "@/types/canvas";

export const PickColorFrame = async (c: any) => {
  const user = getInteractor(c);
  if (!user) {
    return ErrorFrame(c, "Failed to retrieve user, please try again");
  }

  const { inputText: colorCode, buttonValue: coord } = c;
  const position = parseCoordinate(coord);
  if (!position) {
    return ErrorFrame(c, "Failed to pick a color as we could not parse pixel position");
  }
  if (colorCode && isValidColorCode(colorCode.toUpperCase())) {
    await setPixelColor(position, colorCode.toUpperCase());
    await kv.set(`pap:fid:${user.fid}`, {
      fid: user.fid,
      name: user.username,
      avatar: user.pfpUrl,
      updated: getUnixTimestamp(),
    })
    return SuccessFrame(c);
  }

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
          Pick a color
        </h1>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between"
          }}
        >
          {Object.keys(CODE_COLORS).map(code => (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  display: "flex",
                  width: 128,
                  height: 128,
                  background: CODE_COLORS[code as ColorCode],
                }}
              />

              <p
                style={{
                  color: "white",
                  fontFamily: "VT323",
                  fontSize: 72,
                }}
              >
                {code}
              </p>
            </div>
          ))}
        </div>
      </div>
    ),
    intents: [
      <TextInput placeholder={colorCode && !isValidColorCode(colorCode) ? "Invalid color code, try again" : "Enter a color code"} />,
      <Button action="/select">⬅️ Back</Button>,
      <Button value={coordinateToString(position)}>✅ Confirm</Button>
    ],
  });
}