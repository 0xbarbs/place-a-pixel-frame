/** @jsxImportSource frog/jsx */
import { PixelGrid } from "@/components/PixelGrid";
import { Button, TextInput } from "frog";
import { coordinateToString, getAllPixelColors, parseCoordinate } from "@/utils/pixels";
import { PIXELS_X, PIXELS_Y } from "@/constants";
import { getInteractor } from "@/utils/neynar";
import { ErrorFrame } from "@/frames/ErrorFrame";
import { kv } from "@vercel/kv";
import { Session } from "@/types/session";
import { getCoolDownPeriod, isThrottled } from "@/utils/date";

export const SelectPixelFrame = async (c: any) => {
  let error = null;
  const { inputText, buttonValue } = c;
  let selectedPixel = parseCoordinate(inputText);

  const user = getInteractor(c);
  if (!user) {
    return ErrorFrame(c, "Failed to retrieve user, please try again");
  }

  const session = await kv.get<Session>(`pap:fid:${user.fid}`);

  switch (true) {
    case (inputText && !selectedPixel):
      error = "The pixel coordinate you selected is not valid, input the X and Y coordinate separated by a comma";
      break;
    case (selectedPixel && selectedPixel.x > PIXELS_X):
      error = `Your X coordinate must be less than ${PIXELS_X}`;
      selectedPixel = null;
      break;
    case (selectedPixel && selectedPixel.y > PIXELS_Y):
      error = `Your Y coordinate must be less than ${PIXELS_Y}`;
      selectedPixel = null;
      break;
    case (session && isThrottled(session.updated)):
      error = `You must wait ${getCoolDownPeriod(session!.updated)} seconds to paint another pixel`;
      selectedPixel = null;
      break;
  }

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
          showGrid={true}
          highlightedPixel={selectedPixel}
        />

        {error !== null && (
          <div
            style={{
              display: "flex",
              position: "absolute",
              bottom: 32,
              background: "#ebb0b0",
              padding: 16,
              textAlign: "center",
              border: "5px solid red",
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
              {error}
            </p>
          </div>
        )}
      </div>
    ),
    intents: [
      <TextInput placeholder={selectedPixel ? `${selectedPixel.x}, ${selectedPixel.y}` : "X, Y"}/>,
      <Button action="/canvas">⬅️ Back</Button>,
      ...selectedPixel ? [] : [<Button value="refresh">🔄 Refresh</Button>],
      <Button value="select">🖌️ Select</Button>,
      ...selectedPixel ? [<Button action="/color" value={coordinateToString(selectedPixel)}>✅ Confirm</Button>] : [],
    ],
  });
}